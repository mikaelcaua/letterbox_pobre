'use client'

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';

export function AuthForm({ type }: { type: 'login' | 'register' }) {
  const router = useRouter();
  const { login, loading: loadingLogin, error: errorLogin } = useLogin();
  const { register, loading: loadingRegister, error: errorRegister } = useRegister();
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const formData = new FormData(e.currentTarget);
    const username = String(formData.get('username'));
    const password = String(formData.get('password'));
    try {
      if (type === 'login') {
        await login({ username, password });
      } else {
        await register({ username, password });
      }
      router.push('/reviews');
    } catch (err: any) {
      setFormError(err.message);
    }
  }

  const loading = type === 'login' ? loadingLogin : loadingRegister;
  const error = formError || (type === 'login' ? errorLogin : errorRegister);

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