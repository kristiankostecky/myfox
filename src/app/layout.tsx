import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui/sonner'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter as FontSans } from 'next/font/google'

import './globals.css'

export const metadata: Metadata = {
  title: 'MyFox',
  description: 'MyFox booking app',
}
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const NAVIGATION_LINKS = [
  { href: routes.home, label: 'Domů' },
  { href: routes.reservations, label: 'Rezervace' },
  { href: routes.profile, label: 'Osobní údaje' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex h-screen min-h-screen w-full flex-col bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar links={NAVIGATION_LINKS} />
          {children}
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  )
}
