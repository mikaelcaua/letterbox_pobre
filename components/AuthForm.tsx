'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export function AuthForm({ type }: { type: 'login' | 'register' }) {
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const response = await fetch(`/api/auth/${type}`, {
      method: 'POST',
      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password')
      })
    })

    if (response.ok) {
      router.push('/reviews')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className="block mb-2 font-medium text-gray-900">Usuário</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 font-medium text-gray-900">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold transition">{type === 'login' ? 'Entrar' : 'Registrar'}</button>
    </form>
  )
}