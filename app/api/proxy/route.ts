// app/api/proxy/route.ts
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// 簡易charset検出
function detectCharset(contentType: string, text: string): string {
  const metaMatch = text.match(/<meta[^>]*charset=["']?([\w-]+)["']?/i);
  if (metaMatch) {
    return metaMatch[1].toLowerCase();
  }
  if (contentType.includes('charset=')) {
    return contentType.split('charset=')[1].toLowerCase();
  }
  return 'utf-8';
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get('url');

  if (!target) {
    return new Response('Missing URL', { status: 400 });
  }

  try {
    const res = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0 Kimutichan/1.0',
      },
    });

    const contentType = res.headers.get('content-type') || 'text/html; charset=utf-8';
    const arrayBuffer = await res.arrayBuffer();
    const rawText = new TextDecoder('utf-8').decode(arrayBuffer);
    const charset = detectCharset(contentType, rawText);

    let finalText = rawText;

    if (charset !== 'utf-8') {
      // <meta charset>を書き換え
      finalText = rawText.replace(
        /<meta[^>]*charset=["']?[\w-]+["']?/i,
        '<meta charset="utf-8"'
      );
    }

    return new Response(finalText, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (e) {
    return new Response('Proxy fetch error: ' + (e as Error).message, {
      status: 500,
    });
  }
}
