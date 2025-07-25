"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function Navbar({ user }) {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }, [router]);

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-2xl tracking-wide hover:text-blue-300 transition">Avaliações de Filmes</Link>
        <div className="flex space-x-4 items-center">
          {user ? (
            <>
              <Link href="/reviews" className="text-white hover:text-blue-300 transition">Minhas Avaliações</Link>
              <Link href="/add-review" className="text-white hover:text-blue-300 transition">Adicionar Avaliação</Link>
              <button onClick={handleLogout} className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition">Sair</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white hover:text-blue-300 transition">Entrar</Link>
              <Link href="/register" className="text-white hover:text-blue-300 transition">Registrar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}