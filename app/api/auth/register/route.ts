import { registerUser } from '@/lib/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { username, password } = await request.json()
  
  try {
    const user = await registerUser(username, password)
    // Import jwt and JWT_SECRET at the top of your file:
    // import jwt from 'jsonwebtoken'
    // const JWT_SECRET = process.env.JWT_SECRET as string
    // (Make sure JWT_SECRET is defined in your environment variables)
    const jwt = require('jsonwebtoken')
    const JWT_SECRET = process.env.JWT_SECRET as string
    const token: string = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    (await cookies()).set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 hour
    });
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}