import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export function POST() {
  cookies().delete('token')
  return NextResponse.json({ success: true })
}