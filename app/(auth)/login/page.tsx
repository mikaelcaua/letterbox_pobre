import { AuthForm } from '@/components/AuthForm'

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <AuthForm type="login" />
    </div>
  )
}