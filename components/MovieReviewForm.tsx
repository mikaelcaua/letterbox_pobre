'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export function MovieReviewForm() {
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({
        movieName: formData.get('movieName'),
        rating: Number(formData.get('rating')),
        comment: formData.get('comment')
      })
    })

    router.push('/reviews')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="movieName" className="block mb-2 font-medium text-gray-900">Nome do Filme</label>
        <input
          type="text"
          id="movieName"
          name="movieName"
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
        />
      </div>
      <div>
        <label htmlFor="rating" className="block mb-2 font-medium text-gray-900">Nota (1-5)</label>
        <select
          id="rating"
          name="rating"
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        <label htmlFor="comment" className="block mb-2 font-medium text-gray-900">Comentário</label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
        />
      </div>
      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-semibold transition">Enviar Avaliação</button>
    </form>
  )
}