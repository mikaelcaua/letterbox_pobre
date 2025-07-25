import { getCurrentUser } from '../lib/auth'
import { prisma } from '../lib/db'

export async function MovieReviewList() {
  const user = await getCurrentUser()

  if (!user) return <div>Faça login para ver suas avaliações</div>

  const reviews = await prisma.review.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })

  if (reviews.length === 0) {
    return <div>Nenhuma avaliação ainda. <a href="/add-review" className="text-blue-500">Adicione sua primeira avaliação</a></div>
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
  )
}