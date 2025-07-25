import Link from 'next/link'
import { getCurrentUser } from '../lib/auth'

export async function Navbar() {
  const user = await getCurrentUser()

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold">Movie Reviews</Link>
        <div className="flex space-x-4">
          {user ? (
            <>
              <Link href="/reviews" className="text-white">My Reviews</Link>
              <Link href="/add-review" className="text-white">Add Review</Link>
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="text-white">Logout</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white">Login</Link>
              <Link href="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}