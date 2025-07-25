import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
    const token = (await cookies()).get('token')?.value;
    if (!token) return NextResponse.json(null, { status: 200 });
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) return NextResponse.json(null, { status: 200 });
        return NextResponse.json({ id: user.id, username: user.username });
    } catch {
        return NextResponse.json(null, { status: 200 });
    }
} 