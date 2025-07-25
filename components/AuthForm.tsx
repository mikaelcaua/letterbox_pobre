"use client";

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: { username: string; password: string }) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function AuthForm({ type, onSubmit, loading, error }: AuthFormProps) {
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = String(formData.get('username'));
    const password = String(formData.get('password'));
    await onSubmit({ username, password });
    router.push('/reviews');
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
      {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold transition" disabled={loading}>
        {loading ? 'Carregando...' : type === 'login' ? 'Entrar' : 'Registrar'}
      </button>
    </form>
  );
}