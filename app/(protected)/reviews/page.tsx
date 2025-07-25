import { MovieReviewList } from '@/components/MovieReviewList'

export default function ReviewsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Movie Reviews</h1>
      <MovieReviewList />
    </div>
  )
}