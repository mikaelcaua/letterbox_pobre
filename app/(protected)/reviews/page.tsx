'use client';
import { MovieReviewList } from '@/components/MovieReviewList'
import { useMyReviews } from '@/hooks/useMyReviews'
import { useEffect } from 'react'

export default function ReviewsPage() {
  const { reviews, loading, error, fetchReviews } = useMyReviews();
  useEffect(() => { fetchReviews(); }, [fetchReviews]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-yellow-700 text-center">Minhas Avaliações</h1>
        <MovieReviewList reviews={reviews} loading={loading} error={error} onReload={fetchReviews} />
      </div>
    </div>
  )
}