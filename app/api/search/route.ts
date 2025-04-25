import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''

  // 仮の検索結果
  const results = [
    {
      title: `${q} に関する情報 - Kimutichan`,
      url: `https://example.com/info?q=${encodeURIComponent(q)}`,
      snippet: `${q} についての情報はこちら。`,
    },
    {
      title: `${q} のニュース`,
      url: `https://example.com/news?q=${encodeURIComponent(q)}`,
      snippet: `${q} に関する最新ニュース一覧。`,
    },
  ]

  return NextResponse.json({ results })
}
