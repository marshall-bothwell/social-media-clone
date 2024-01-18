import Providers from '@/app/providers'
import Header from '@/components/header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SocialClone',
  description: 'A Social Networking Webapp to demonstrate NextJS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
          <Providers>
            <div className="container mx-auto px-4 max-w-6xl">
              <Header />
              {children}
            </div>
          </Providers>
      </body>
    </html>
  )
}
