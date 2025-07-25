import { MovieReviewList } from '@/components/MovieReviewList'

export default function ReviewsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-yellow-700 text-center">Minhas Avaliações</h1>
        <MovieReviewList />
      </div>
    </div>
  )
}