import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <div className="text-center mt-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Movie Reviews</h1>
      {user ? (
        <div>
          <p>Welcome back, {user.username}!</p>
          <Link href="/reviews" className="text-blue-500 mt-4 inline-block">
            View your reviews
          </Link>
        </div>
      ) : (
        <div>
          <p>Please login or register to start reviewing movies.</p>
          <div className="mt-4 space-x-4">
            <Link href="/login" className="text-blue-500">Login</Link>
            <Link href="/register" className="text-blue-500">Register</Link>
          </div>
        </div>
      )}
    </div>
  )
}