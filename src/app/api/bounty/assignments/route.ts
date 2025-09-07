import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/auth'; 

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userPayload = verifyToken(token);
    if (!userPayload?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's bounty assignments
    // Note: This will work once Prisma client is regenerated with: npx prisma generate
    const assignments = await (prisma as any).bountyAssignment.findMany({
      where: {
        userId: userPayload.id
      },
      include: {
        bounty: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Check for expired assignments
    const now = new Date();
    const expiredAssignments = assignments.filter(
      (assignment: any) => assignment.status === 'IN_PROGRESS' && new Date(assignment.expiresAt) < now
    );

    // Update expired assignments
    if (expiredAssignments.length > 0) {
      await (prisma as any).bountyAssignment.updateMany({
        where: {
          id: { in: expiredAssignments.map((a: any) => a.id) }
        },
        data: {
          status: 'EXPIRED'
        }
      });
    }

    // Refetch assignments with updated statuses
    const updatedAssignments = await (prisma as any).bountyAssignment.findMany({
      where: {
        userId: userPayload.id
      },
      include: {
        bounty: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ success: true, assignments: updatedAssignments });

  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
