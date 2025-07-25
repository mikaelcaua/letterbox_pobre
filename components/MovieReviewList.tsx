import { getCurrentUser } from '../lib/auth'
import { prisma } from '../lib/db'

export async function MovieReviewList() {
  const user = await getCurrentUser()
  
  if (!user) return <div>Please login to view reviews</div>

  const reviews = await prisma.review.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })

  if (reviews.length === 0) {
    return <div>No reviews yet. <a href="/add-review" className="text-blue-500">Add your first review</a></div>
  }

  return (
    <div className="space-y-4">
      {reviews.map(review => (
        <div key={review.id} className="p-4 border rounded">
          <h3 className="text-xl font-bold">{review.movieName}</h3>
          <div className="text-yellow-500">Rating: {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
          {review.comment && <p className="mt-2">{review.comment}</p>}
          <div className="text-sm text-gray-500 mt-2">
            Reviewed on {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}