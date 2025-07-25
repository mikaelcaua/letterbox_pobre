import { AuthForm } from '@/components/AuthForm'

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
      <AuthForm type="register" />
    </div>
  )
}