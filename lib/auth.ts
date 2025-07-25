import { prisma } from './db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function registerUser(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)
  return prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  })
}

export async function loginUser(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } })
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' })
  
  return token
}

export function getCurrentUser() {
  const token = cookies().get('token')?.value
  
  if (!token) return null
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
    return prisma.user.findUnique({ where: { id: decoded.userId } })
  } catch (error) {
    return null
  }
}

export function logoutUser() {
  cookies().delete('token')
}