import './globals.css'
import { Navbar } from '@/components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar user={undefined} />
        <main className="p-0">
          {children}
        </main>
      </body>
    </html>
  )
}