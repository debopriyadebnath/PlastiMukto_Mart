import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    console.log('Auth/me request received');
    
    const token = getTokenFromRequest(request);
    console.log('Token found:', !!token);

    if (!token) {
      console.log('No token provided');
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    console.log('Token payload:', payload ? 'Valid' : 'Invalid');

    if (!payload) {
      console.log('Invalid token');
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get fresh user data from database
    console.log('Fetching user data for ID:', payload.id);
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        name: true,
        email: true,
        points: true,
        rank: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      console.log('User not found in database');
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    console.log('User data retrieved successfully');
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

