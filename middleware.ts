import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const protectedPaths = ['/reviews', '/add-review']
  const isProtected = protectedPaths.some(p => path.startsWith(p))

  if (isProtected) {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      // Verificar o token aqui se necessário
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}