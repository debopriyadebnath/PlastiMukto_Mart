import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('Registration request received');
    
    const { name, email, password } = await request.json();
    console.log('Registration data:', { name, email, password: '***' });

    // Validation
    if (!name || !email || !password) {
      console.log('Validation failed: missing fields');
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log('Validation failed: password too short');
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('Checking if user exists...');
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('User already exists');
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await hashPassword(password);

    // Create user
    console.log('Creating user...');
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        points: 0,
      },
      select: {
        id: true,
        name: true,
        email: true,
        points: true,
        rank: true,
      }
    });

    console.log('User created:', { id: user.id, name: user.name, email: user.email });

    // Generate JWT token
    console.log('Generating JWT token...');
    const tokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      points: user.points,
      rank: user.rank || undefined,
    };
    
    console.log('Token payload:', tokenPayload);
    
    const token = generateToken(tokenPayload);
    console.log('Token generated:', token ? 'SUCCESS' : 'FAILED');
    
    if (!token) {
      throw new Error('Failed to generate JWT token');
    }

    // Create response with cookie
    console.log('Creating response...');
    const response = NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          points: user.points,
          rank: user.rank,
        }
      },
      { status: 201 }
    );

    // Set HTTP-only cookie
    console.log('Setting auth cookie...');
    const cookieString = setAuthCookie(token);
    console.log('Cookie string:', cookieString);
    response.headers.set('Set-Cookie', cookieString);

    console.log('Registration completed successfully');
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

