import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function registerUser(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
}

export async function POST(request: Request) {
  const { username, password } = await request.json();
  try {
    const user = await registerUser(username, password);
    const token: string = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    (await cookies()).set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 hour
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}