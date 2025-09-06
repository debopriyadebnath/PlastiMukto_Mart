import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

export interface UserPayload {
  id: string;
  email: string;
  name: string;
  points: number;
  rank?: number;
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: UserPayload): string {
  try {
    console.log('JWT_SECRET exists:', !!JWT_SECRET);
    console.log('JWT_SECRET length:', JWT_SECRET.length);
    
    if (!JWT_SECRET || JWT_SECRET === 'your-secret-key') {
      console.warn('Using default JWT_SECRET - this is not secure for production!');
    }
    
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    console.log('Token generated successfully, length:', token.length);
    return token;
  } catch (error) {
    console.error('Token generation error:', error);
    throw new Error('Failed to generate JWT token');
  }
}

export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch  {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Also check cookies
  const token = request.cookies.get('auth-token')?.value;
  return token || null;
}

export function setAuthCookie(token: string): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieString = `auth-token=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}${isProduction ? '; Secure' : ''}`;
  console.log('Cookie string created:', cookieString.substring(0, 50) + '...');
  return cookieString;
}

export function clearAuthCookie(): string {
  const isProduction = process.env.NODE_ENV === 'production';
  return `auth-token=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${isProduction ? '; Secure' : ''}`;
}
