import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

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
