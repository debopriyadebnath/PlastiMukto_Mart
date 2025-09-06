import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    console.log('Getting analysis history')
    
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

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    // Build where clause
    const whereClause: any = {
      userId: payload.id
    }

    if (status && ['processing', 'completed', 'failed'].includes(status)) {
      whereClause.status = status
    }

    // Get analyses with pagination
    const [analyses, totalCount] = await Promise.all([
      prisma.wasteAnalysis.findMany({
        where: whereClause,
        include: {
          detectedItems: {
            select: {
              id: true,
              name: true,
              category: true,
              confidence: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.wasteAnalysis.count({
        where: whereClause
      })
    ])

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return NextResponse.json({
      success: true,
      analyses,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage
      }
    })

  } catch (error) {
    console.error('Get history error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
