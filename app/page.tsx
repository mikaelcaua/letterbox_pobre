import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-xl text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-700">Avaliações de Filmes</h1>
        {user ? (
          <div>
            <p className="text-lg mb-6 text-black">Bem-vindo de volta, <span className="font-semibold text-green-700">{user.username}</span>!</p>
            <Link href="/reviews" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition">Ver minhas avaliações</Link>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-6">Entre ou registre-se para começar a avaliar seus filmes favoritos!</p>
            <div className="flex justify-center gap-6">
              <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition">Entrar</Link>
              <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition">Registrar</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}