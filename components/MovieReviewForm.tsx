"use client";

import { FormEvent } from 'react';

interface MovieReviewFormProps {
  onSubmit: (data: { movieName: string; rating: number; comment?: string }) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function MovieReviewForm({ onSubmit, loading, error }: MovieReviewFormProps) {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const movieName = String(formData.get('movieName'));
    const rating = Number(formData.get('rating'));
    const comment = String(formData.get('comment'));
    await onSubmit({ movieName, rating, comment });
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
      {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-semibold transition" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Avaliação'}
      </button>
    </form>
  );
}