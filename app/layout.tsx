import type { Metadata } from 'next'

import { Noto_Sans_TC } from 'next/font/google'
import { SideBar } from './components/ui/sidebar'
import './globals.css'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'dnd-kit demo',
  description: '介紹 dnd-kit 的基本用法',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`bg-black text-white ${notoSansTC.className} antialiased `}>
        <div className='flex h-dvh'>
          <SideBar />
          <main className='flex-1 px-8 py-6 overflow-y-auto'>{children}</main>
        </div>
      </body>
    </html>
  )
}
