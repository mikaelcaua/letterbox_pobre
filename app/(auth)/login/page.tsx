'use client';

import { AuthForm } from '@/components/AuthForm'
import { useLogin } from '@/hooks/useLogin'

export default function LoginPage() {
  const { login, loading, error } = useLogin();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Entrar</h1>
        <AuthForm type="login" onSubmit={login} loading={loading} error={error} />
      </div>
    </div>
  )
}