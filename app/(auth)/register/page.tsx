'use client';
import { AuthForm } from '@/components/AuthForm'
import { useRegister } from '@/hooks/useRegister'

export default function RegisterPage() {
  const { register, loading, error } = useRegister();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Registrar</h1>
        <AuthForm type="register" onSubmit={register} loading={loading} error={error} />
      </div>
    </div>
  )
}