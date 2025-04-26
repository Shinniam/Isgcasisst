// app/api/proxy/route.ts
import { NextRequest } from 'next/server';

export const runtime = 'edge';

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
    const data = await res.text();

    return new Response(data, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (e) {
    return new Response('Proxy fetch error: ' + (e as Error).message, {
      status: 500,
    });
  }
}
