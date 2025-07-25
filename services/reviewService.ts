export async function createReview({ movieName, rating, comment }: { movieName: string; rating: number; comment?: string }) {
    const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieName, rating, comment })
    });
    if (!res.ok) throw new Error('Erro ao criar avaliação');
    return res.json();
}

export async function getMyReviews() {
    const res = await fetch('/api/reviews');
    if (!res.ok) throw new Error('Erro ao buscar avaliações');
    return res.json();
} 