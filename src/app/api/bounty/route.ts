import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const bounties = await prisma.bounty.findMany({
      where: {
        status: 'open'
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ bounties });

  } catch (error) {
    console.error('Error fetching bounties:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
