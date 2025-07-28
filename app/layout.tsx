// app/layout.tsx
//import './globals.css'    // si tu as des styles globaux
import { ReactNode } from 'react'

export const metadata = {
  title: 'RunningNad',
  description: 'Mini Monad TRex Runner for Farcaster',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}
