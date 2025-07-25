import { loginUser } from '@/lib/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  try {
    const token: string = await loginUser(username, password);

    (await cookies()).set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 hour
    })
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}