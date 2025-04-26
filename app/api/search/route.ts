// app/api/search/route.ts
import { NextRequest } from 'next/server';
import { detectCharset } from '@/lib/charset';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return new Response(JSON.stringify({ results: [] }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  try {
    // ここでは仮に safe-search サンプルサイトを叩く（あとでリアル検索に切替）
    const searchUrl = `https://example.com/search?q=${encodeURIComponent(query)}`;
    const res = await fetch(searchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 KimutichanBot/1.0' },
    });

    const contentType = res.headers.get('content-type') || '';
    const arrayBuffer = await res.arrayBuffer();
    const rawText = new TextDecoder('utf-8').decode(arrayBuffer);

    const charset = detectCharset(contentType, rawText);

    let finalText = rawText;
    if (charset !== 'utf-8') {
      finalText = rawText.replace(
        /<meta[^>]*charset=["']?[\w\-]+["']?/i,
        '<meta charset="utf-8"'
      );
    }

    // 超シンプルにタイトルタグだけ取ってみる
    const titles = Array.from(finalText.matchAll(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gi))
      .slice(0, 10)
      .map((m) => ({
        url: m[1],
        title: m[2],
        snippet: '',
      }));

    return new Response(JSON.stringify({ results: titles }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
