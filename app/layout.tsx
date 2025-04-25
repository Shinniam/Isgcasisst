import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kimutichan Proxy',
  description: '超高速・互換プロキシ検索エンジン',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
