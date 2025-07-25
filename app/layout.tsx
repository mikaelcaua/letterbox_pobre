import './globals.css'
import { getCurrentUser } from '@/lib/auth'
import { Navbar } from '@/components/Navbar'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser();
  return (
    <html lang="pt-BR">
      <body>
        <Navbar user={user} />
        <main className="p-0">
          {children}
        </main>
      </body>
    </html>
  )
}