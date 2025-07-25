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
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">Username</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          required 
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          required 
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {type === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  )
}