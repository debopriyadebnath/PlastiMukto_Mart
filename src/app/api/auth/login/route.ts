import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, generateToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('Login request received');
    
    const { email, password } = await request.json();
    console.log('Login data:', { email, password: '***' });

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    console.log('Finding user...');
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    console.log('Verifying password...');
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      console.log('Invalid password');
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    console.log('Generating JWT token...');
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      points: user.points,
      rank: user.rank || undefined,
    });

    // Create response with cookie
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          points: user.points,
          rank: user.rank,
        }
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.headers.set('Set-Cookie', setAuthCookie(token));

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

