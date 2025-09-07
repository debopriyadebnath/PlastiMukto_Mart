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

    const { assignmentId } = await request.json();

    if (!assignmentId) {
      return NextResponse.json({ error: 'Assignment ID is required' }, { status: 400 });
    }

    // Find the assignment
    const assignment = await (prisma as any).bountyAssignment.findFirst({
      where: {
        id: assignmentId,
        userId: userPayload.id,
        status: 'IN_PROGRESS'
      },
      include: {
        bounty: true
      }
    });

    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found or already completed' }, { status: 404 });
    }

    // Check if assignment has expired
    if (new Date() > assignment.expiresAt) {
      await (prisma as any).bountyAssignment.update({
        where: { id: assignmentId },
        data: { status: 'EXPIRED' }
      });
      return NextResponse.json({ error: 'Assignment has expired' }, { status: 400 });
    }

    // Complete the assignment and add tokens
    const updatedAssignment = await (prisma as any).bountyAssignment.update({
      where: { id: assignmentId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date()
      }
    });

    // Add tokens to user
    const updatedUser = await prisma.user.update({
      where: { id: userPayload.id },
      data: {
        points: {
          increment: assignment.bounty.rewardTokens || 0
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      assignment: updatedAssignment,
      user: { points: updatedUser.points },
      message: 'Bounty completed successfully' 
    });

  } catch (error) {
    console.error('Error completing bounty:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
