import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'
import { analyzeWasteImage, validateAnalysisResult } from '@/lib/gemini/analysis'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    console.log('Waste analysis request received')
    
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

    const { analysisId } = await request.json()

    if (!analysisId) {
      return NextResponse.json(
        { message: 'Analysis ID is required' },
        { status: 400 }
      )
    }

    // Get the analysis record
    const analysis = await prisma.wasteAnalysis.findFirst({
      where: {
        id: analysisId,
        userId: payload.id,
        status: 'processing'
      }
    })

    if (!analysis) {
      return NextResponse.json(
        { message: 'Analysis not found or already processed' },
        { status: 404 }
      )
    }

    console.log('Starting Gemini analysis for:', analysis.imageUrl)

    // Analyze the image with Gemini
    const analysisResult = await analyzeWasteImage(analysis.imageUrl)

    // Validate the result
    const isValid = await validateAnalysisResult(analysisResult)
    
    if (!isValid) {
      // Update analysis status to failed
      await prisma.wasteAnalysis.update({
        where: { id: analysisId },
        data: {
          status: 'failed',
          errorMessage: 'Invalid analysis result from AI',
          completedAt: new Date()
        }
      })

      return NextResponse.json(
        { message: 'Analysis failed - invalid result' },
        { status: 500 }
      )
    }

    // Save detected items to database
    const detectedItems = await Promise.all(
      analysisResult.detectedItems.map(item =>
        prisma.detectedWasteItem.create({
          data: {
            name: item.name,
            category: item.category,
            material: item.material,
            confidence: item.confidence,
            description: item.description,
            analysisId: analysisId
          }
        })
      )
    )

    // Update analysis with results
    const updatedAnalysis = await prisma.wasteAnalysis.update({
      where: { id: analysisId },
      data: {
        status: 'completed',
        rawGeminiResponse: analysisResult,
        lifecycleInfo: analysisResult.detectedItems.map(item => item.lifecycleInfo),
        recyclingOptions: analysisResult.detectedItems.map(item => item.recyclingOptions),
        reuseIdeas: analysisResult.detectedItems.map(item => item.reuseIdeas),
        confidence: analysisResult.overallConfidence,
        completedAt: new Date()
      },
      include: {
        detectedItems: true
      }
    })

    // Award points for successful analysis (10 points per detected item)
    const pointsToAward = detectedItems.length * 10
    await prisma.user.update({
      where: { id: payload.id },
      data: {
        points: {
          increment: pointsToAward
        }
      }
    })

    console.log('Analysis completed successfully:', analysisId)
    console.log('Points awarded:', pointsToAward)

    return NextResponse.json({
      success: true,
      analysis: updatedAnalysis,
      pointsAwarded: pointsToAward,
      message: 'Analysis completed successfully'
    })

  } catch (error) {
    console.error('Analysis error:', error)
    
    // Update analysis status to failed if we have an analysisId
    try {
      const { analysisId } = await request.json()
      if (analysisId) {
        await prisma.wasteAnalysis.update({
          where: { id: analysisId },
          data: {
            status: 'failed',
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
            completedAt: new Date()
          }
        })
      }
    } catch (updateError) {
      console.error('Failed to update analysis status:', updateError)
    }

    return NextResponse.json(
      { message: 'Analysis failed' },
      { status: 500 }
    )
  }
}
