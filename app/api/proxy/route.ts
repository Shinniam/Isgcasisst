import { NextRequest } from 'next/server'

export const runtime = 'edge'

function fixCharset(html: string): string {
  return html.replace(/<meta[^>]*charset=["']?[\w\-]+["']?/i, '<meta charset="utf-8"')
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const target = searchParams.get('url')
  if (!target) {
    return new Response('Missing url', { status: 400 })
  }

  try {
    const res = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0 Kimutichan/1.0 (compatible)',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      redirect: 'follow',
    })

    const contentType = res.headers.get('content-type') || ''
    const buffer = await res.arrayBuffer()
    let text = new TextDecoder('utf-8').decode(buffer)

    // HTML確認とcharset修正
    if (contentType.includes('text/html')) {
      text = fixCharset(text)
      if (!text.includes('<html')) {
        text = `<html><body><h1>このページはJavaScriptで描画されるため、現在の環境では表示できません。</h1></body></html>`
      }
    }

    return new Response(text, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 's-maxage=60',
        'X-Kimutichan-Proxy': 'Success',
      },
    })
  } catch (err) {
    return new Response('Fetch error: ' + (err as Error).message, { status: 500 })
  }
}
