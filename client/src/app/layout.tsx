import { Inter } from 'next/font/google'
import '../styles/master.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TotalWash',
  description: 'Fulfilling all your washroom-related needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
