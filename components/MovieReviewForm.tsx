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
        rating: formData.get('rating'),
        comment: formData.get('comment')
      })
    })

    router.push('/reviews')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="movieName" className="block mb-2">Movie Name</label>
        <input 
          type="text" 
          id="movieName" 
          name="movieName" 
          required 
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="block mb-2">Rating (1-5)</label>
        <select 
          id="rating" 
          name="rating" 
          required 
          className="w-full p-2 border rounded"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block mb-2">Comment</label>
        <textarea 
          id="comment" 
          name="comment" 
          rows={4} 
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit Review
      </button>
    </form>
  )
}