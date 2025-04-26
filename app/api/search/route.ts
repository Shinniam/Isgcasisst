// app/api/search/route.ts
import { NextRequest } from 'next/server';

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

  // 仮のダミーデータを返す（本物の検索エンジン組み込みは後で！）
  const results = [
    {
      title: `${query} に関する情報`,
      url: 'https://example.com',
      snippet: `${query} についてのサンプル説明文です。`,
    },
    {
      title: `${query} をもっと知る`,
      url: 'https://example.org',
      snippet: `${query} に関連する追加情報。`,
    },
  ];

  return new Response(JSON.stringify({ results }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
