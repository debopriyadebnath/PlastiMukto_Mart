import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    const payload = token && verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const analyses = await prisma.wasteAnalysis.findMany({
      where: { userId: payload.id },
      orderBy: { createdAt: 'desc' },
      include: {
        detectedItems: { select: { id: true, name: true, category: true } } as any
      }
    })

    return NextResponse.json({ success: true, analyses })
  } catch (e) {
    console.error('GET /api/waste-analysis/history error:', e)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analyses' },
      { status: 500 }
    )
  }
}
