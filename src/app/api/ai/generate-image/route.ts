import { NextRequest, NextResponse } from 'next/server'

// Minimal Gemini web call; expects GEMINI_API_KEY in env
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GENERATE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent'

export async function POST(req: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ success: false, message: 'Missing GEMINI_API_KEY' }, { status: 500 })
    }

    const { idea, itemName, itemCategory } = await req.json()
    if (!idea) {
      return NextResponse.json({ success: false, message: 'idea is required' }, { status: 400 })
    }

    const prompt = `Generate a simple concept image (illustrative) for an upcycling idea.\n` +
      `Waste item: ${itemName ?? 'Unknown'} (category: ${itemCategory ?? 'Unknown'}).\n` +
      `Idea: ${idea}.\n` +
      `Style: clean, minimal, eco-friendly, white background.\n` +
      `Output: Return only a base64 image (PNG) embedded via data URL if supported, or a concise textual description if image generation is not available.`

    const res = await fetch(`${GENERATE_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ]
      })
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ success: false, message: 'Gemini error', detail: text }, { status: res.status })
    }

    const data = await res.json() as any

    const parts = data?.candidates?.[0]?.content?.parts ?? []

    // 1) Try inlineData (base64 image)
    for (const p of parts) {
      const inline = p?.inlineData
      if (inline?.mimeType?.startsWith('image/') && inline?.data) {
        const url = `data:${inline.mimeType};base64,${inline.data}`
        return NextResponse.json({ success: true, imageDataUrl: url })
      }
    }

    // 2) Try fileData (URL to an image asset)
    for (const p of parts) {
      const file = p?.fileData
      if (file?.mimeType?.startsWith('image/') && file?.fileUri) {
        return NextResponse.json({ success: true, imageUrl: file.fileUri })
      }
    }

    // 3) Try data URL inside text
    const text = parts.map((p: any) => p?.text).filter(Boolean).join('\n')
    if (text) {
      const cleaned = text.replace(/```(json)?/g, '').trim()
      const match = cleaned.match(/data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+/)
      if (match) {
        return NextResponse.json({ success: true, imageDataUrl: match[0] })
      }
      return NextResponse.json({ success: true, description: cleaned })
    }

    // 4) Nothing usable
    return NextResponse.json({ success: false, message: 'No image returned from model' }, { status: 422 })
  } catch (e: any) {
    return NextResponse.json({ success: false, message: 'Failed to generate image', error: e?.message }, { status: 500 })
  }
}
