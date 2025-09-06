// src/app/api/waste-analysis/analyze-direct/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'
import { analyzeWasteImage, validateAnalysisResult } from '@/lib/gemini/analysis'

export async function POST(request: NextRequest) {
  try {
    console.log('Direct waste analysis request received')
    
    // Verify authentication
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    const { imageData, fileName, fileSize, mimeType } = await request.json()

    if (!imageData) {
      return NextResponse.json(
        { message: 'Image data is required' },
        { status: 400 }
      )
    }

    console.log('Starting direct Gemini analysis')

    // Analyze the image directly with Gemini
    const analysisResult = await analyzeWasteImage(imageData)

    // Validate the result
    const isValid = await validateAnalysisResult(analysisResult)
    
    if (!isValid) {
      return NextResponse.json(
        { message: 'Analysis failed - invalid result' },
        { status: 500 }
      )
    }

    console.log('Direct analysis completed successfully')

    return NextResponse.json({
      success: true,
      analysis: {
        detectedItems: analysisResult.detectedItems,
        lifecycleInfo: analysisResult.detectedItems.map(item => item.lifecycleInfo),
        recyclingOptions: analysisResult.detectedItems.map(item => item.recyclingOptions),
        reuseIdeas: analysisResult.detectedItems.map(item => item.reuseIdeas),
        confidence: analysisResult.overallConfidence,
        analysisNotes: analysisResult.analysisNotes
      },
      imageInfo: {
        fileName,
        fileSize,
        mimeType
      }
    })

  } catch (error) {
    console.error('Direct analysis error:', error)
    return NextResponse.json(
      { message: 'Analysis failed' },
      { status: 500 }
    )
  }
}