import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userPayload = verifyToken(token);
    if (!userPayload?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bountyId } = await request.json();

    if (!bountyId) {
      return NextResponse.json({ error: 'Bounty ID is required' }, { status: 400 });
    }

    // Check if bounty exists and is available
    const bounty = await (prisma as any).bounty.findUnique({
      where: { id: bountyId },
      include: { assignments: true }
    });

    if (!bounty) {
      return NextResponse.json({ error: 'Bounty not found' }, { status: 404 });
    }

    // Check if user already has an assignment for this bounty
    const existingAssignment = await (prisma as any).bountyAssignment.findFirst({
      where: {
        userId: userPayload.id,
        bountyId: bountyId
      }
    });

    if (existingAssignment) {
      return NextResponse.json({ 
        error: 'You have already taken this bounty',
        assignment: existingAssignment 
      }, { status: 400 });
    }

    // Create new assignment
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 48); // 48 hours from now

    const assignment = await (prisma as any).bountyAssignment.create({
      data: {
        userId: userPayload.id,
        bountyId: bountyId,
        status: 'IN_PROGRESS',
        startTime: new Date(),
        expiresAt: expiresAt
      },
      include: {
        bounty: true
      }
    });

    return NextResponse.json({ 
      success: true, 
      assignment,
      message: 'Bounty assigned successfully' 
    });

  } catch (error) {
    console.error('Error taking bounty:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
