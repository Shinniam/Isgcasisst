// app/api/proxy/route.ts
import { NextRequest } from 'next/server';
import { detectCharset } from '@/lib/charset'; // charset検出ライブラリ

export const runtime = 'edge'; // Edge Functions

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing url', { status: 400 });
  }

  try {
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 Kimutichan/1.0',
      },
    });

    const contentType = res.headers.get('content-type') || '';
    const arrayBuffer = await res.arrayBuffer();
    const rawText = new TextDecoder('utf-8').decode(arrayBuffer);
    const charset = detectCharset(contentType, rawText);

    let finalText = rawText;
    if (charset !== 'utf-8') {
      // metaタグのcharsetを書き換える（超重要）
      finalText = rawText.replace(
        /<meta[^>]*charset=["']?[\w\-]+["']?/i,
        '<meta charset="utf-8"'
      );
    }

    return new Response(finalText, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return new Response('Error fetching target: ' + (error as Error).message, { status: 500 });
  }
}

