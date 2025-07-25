"use client";

import Link from 'next/link';

interface MovieReviewListProps {
  reviews: any[];
  loading: boolean;
  error: string | null;
  onReload: () => void;
}

export function MovieReviewList({ reviews, loading, error, onReload }: MovieReviewListProps) {
  if (loading) return <div>Carregando avaliações...</div>;
  if (error) return <div className="text-red-600">Erro: {error} <button onClick={onReload} className="ml-2 underline text-blue-600">Tentar novamente</button></div>;
  if (!reviews.length) {
    return <div>Nenhuma avaliação ainda. <Link href="/add-review" className="text-blue-500">Adicione sua primeira avaliação</Link></div>;
  }

  return (
    <div className="space-y-6">
      {reviews.map(review => (
        <div key={review.id} className="p-6 border-l-4 border-yellow-400 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{review.movieName}</h3>
          <div className="text-yellow-500 text-lg mb-1">Nota: {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
          {review.comment && <p className="mt-2 text-gray-700 italic">{review.comment}</p>}
          <div className="text-sm text-gray-500 mt-2">
            Avaliado em {new Date(review.createdAt).toLocaleDateString('pt-BR')}
          </div>
        </div>
      ))}
    </div>
  );
}