import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'
import { uploadWasteImage } from '@/lib/supabase/storage'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    console.log('Save analysis request received')
    
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

    const { imageData, fileName, fileSize, mimeType, analysis } = await request.json()

    // Convert base64 to File
    const base64Data = imageData.split(',')[1]
    const buffer = Buffer.from(base64Data, 'base64')
    const file = new File([buffer], fileName, { type: mimeType })

    // Upload to Supabase storage
    const uploadResult = await uploadWasteImage(file, payload.id)
    
    if (!uploadResult.success) {
      return NextResponse.json(
        { message: uploadResult.error || 'Upload failed' },
        { status: 500 }
      )
    }

    // Create analysis record in database
    const analysisRecord = await prisma.wasteAnalysis.create({
      data: {
        imageUrl: uploadResult.url!,
        imageName: fileName,
        imageSize: fileSize,
        mimeType: mimeType,
        status: 'completed',
        rawGeminiResponse: analysis,
        lifecycleInfo: analysis.lifecycleInfo,
        recyclingOptions: analysis.recyclingOptions,
        reuseIdeas: analysis.reuseIdeas,
        confidence: analysis.confidence,
        completedAt: new Date(),
        userId: payload.id
      }
    })

    // Save detected items
    const detectedItems = await Promise.all(
      analysis.detectedItems.map((item: any) =>
        prisma.detectedWasteItem.create({
          data: {
            name: item.name,
            category: item.category,
            material: item.material,
            confidence: item.confidence,
            description: item.description,
            analysisId: analysisRecord.id
          }
        })
      )
    )

    // Award points
    const pointsToAward = detectedItems.length * 10
    await prisma.user.update({
      where: { id: payload.id },
      data: {
        points: {
          increment: pointsToAward
        }
      }
    })

    return NextResponse.json({
      success: true,
      analysisId: analysisRecord.id,
      pointsAwarded: pointsToAward,
      message: 'Analysis saved successfully'
    })

  } catch (error) {
    console.error('Save analysis error:', error)
    return NextResponse.json(
      { message: 'Failed to save analysis' },
      { status: 500 }
    )
  }
}
