import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Byteforce APP',
  description: 'Byteforce app',
  generator: 'Byteforce',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
