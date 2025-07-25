'use client';
import { MovieReviewForm } from '@/components/MovieReviewForm'
import { useCreateReview } from '@/hooks/useCreateReview'

export default function AddReviewPage() {
  const { createReview, loading, error } = useCreateReview();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">Adicionar Avaliação</h1>
        <MovieReviewForm onSubmit={createReview} loading={loading} error={error} />
      </div>
    </div>
  )
}