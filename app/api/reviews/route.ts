import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function getCurrentUser() {
    const token = (await cookies()).get('token')?.value;
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        return prisma.user.findUnique({ where: { id: decoded.userId } });
    } catch (error) {
        return null;
    }
}

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Usuário não autenticado.' }, { status: 401 });
        }

        const body = await request.json();
        const { movieName, rating, comment } = body;

        if (!movieName || typeof rating !== 'number') {
            return NextResponse.json({ error: 'Campos obrigatórios: movieName, rating (number).' }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                movieName,
                rating,
                comment,
                userId: user.id,
            },
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar review.' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Usuário não autenticado.' }, { status: 401 });
        }
        const reviews = await prisma.review.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar avaliações.' }, { status: 500 });
    }
}
