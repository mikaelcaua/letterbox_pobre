'use client';
import { MovieReviewForm } from '@/components/MovieReviewForm'
import { useCreateReview } from '@/hooks/useCreateReview'
import { useRouter } from 'next/navigation';

export default function AddReviewPage() {
  const { createReview, loading, error } = useCreateReview();
  const router = useRouter();

  async function handleCreateReview(data: { movieName: string; rating: number; comment?: string }) {
    await createReview(data);
    router.push('/reviews');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">Adicionar Avaliação</h1>
        <MovieReviewForm onSubmit={handleCreateReview} loading={loading} error={error} />
      </div>
    </div>
  )
}