import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

export async function GET() {
  try {
    const bounties = await prisma.bounty.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        wasteAnalysis: {
          select: {
            id: true,
            imageUrl: true,
            imageName: true,
            imageSize: true,
            mimeType: true,
            confidence: true,
            detectedItems: true,
            recyclingOptions: true,
            reuseIdeas: true,
            createdAt: true,
          }
        },
        user: { select: { id: true, name: true, email: true } }
      }
    })
    return NextResponse.json({ success: true, bounties })
  } catch (e) {
    console.error('GET /api/bounties error:', e)
    return NextResponse.json({ success: false, message: 'Failed to fetch bounties' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    const payload = token && verifyToken(token)
    if (!payload) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { wasteAnalysisId, idea, title, description, rewardTokens } = body

    if (!wasteAnalysisId || !idea || !title) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    // Ensure the analysis belongs to the user
    const wa = await prisma.wasteAnalysis.findUnique({
      where: { id: wasteAnalysisId },
      select: { id: true, userId: true }
    })
    if (!wa || wa.userId !== payload.id) {
      return NextResponse.json({ message: 'Invalid waste analysis' }, { status: 403 })
    }

    const bounty = await prisma.bounty.create({
      data: {
        title,
        description: description || '',
        idea,
        rewardTokens: rewardTokens ?? null,
        userId: payload.id,
        wasteAnalysisId
      },
      include: {
        wasteAnalysis: true,
        user: { select: { id: true, name: true, email: true } }
      }
    })

    return NextResponse.json({ success: true, bounty })
  } catch (e) {
    console.error('POST /api/bounties error:', e)
    return NextResponse.json({ success: false, message: 'Failed to create bounty' }, { status: 500 })
  }
}