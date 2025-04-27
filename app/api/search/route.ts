// app/api/search/route.ts
import { NextRequest } from 'next/server';

export const runtime = 'edge'; // Edge Functionsで超高速！

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return new Response(JSON.stringify({ results: [] }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // ここで直接Googleなどにアクセスするとまずいので、
    // 代わりに kimu.vercel.app みたいな自前プロキシサーバーに飛ばす。
    const proxyUrl = `https://your-proxy.vercel.app/api/proxy?url=https://www.google.com/search?q=${encodeURIComponent(query)}`;

    const proxyRes = await fetch(proxyUrl);
    const html = await proxyRes.text();

    // 簡単にリンクだけ抽出
    const urls = Array.from(html.matchAll(/href="(https?:\/\/[^"]+)"/g)).map(m => m[1]);

    return new Response(JSON.stringify({ results: urls.slice(0, 10) }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (e) {
    return new Response(JSON.stringify({ results: [] }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
