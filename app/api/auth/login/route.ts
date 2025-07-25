import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function loginUser(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciais inválidas');
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  return token;
}

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    const token: string = await loginUser(username, password);
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