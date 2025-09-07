import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ analysisId: string }> }
) {
  try {
    const { analysisId } = await context.params
    console.log('Getting analysis results for:', analysisId)
    
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

    // Get the analysis with detected items
  const analysis = await prisma.wasteAnalysis.findFirst({
      where: {
    id: analysisId,
        userId: payload.id
      },
      include: {
        detectedItems: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!analysis) {
      return NextResponse.json(
        { message: 'Analysis not found' },
        { status: 404 }
      )
    }

    // Don't return sensitive data
    const { user, ...analysisData } = analysis
    const sanitizedAnalysis = {
      ...analysisData,
      user: {
        id: user.id,
        name: user.name
      }
    }

    return NextResponse.json({
      success: true,
      analysis: sanitizedAnalysis
    })

  } catch (error) {
    console.error('Get analysis error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
