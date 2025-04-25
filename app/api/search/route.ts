// app/api/search/route.ts
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    return new Response(JSON.stringify({ results: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const proxyURL = `https://your-domain.vercel.app/api/proxy?url=https://www.bing.com/search?q=${encodeURIComponent(q)}`;

  try {
    const htmlRes = await fetch(proxyURL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 Kimutichan/1.0',
      },
    });
    const html = await htmlRes.text();

    const results = parseSearchResults(html);
    return new Response(JSON.stringify({ results }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function parseSearchResults(html: string): { title: string; description: string; url: string }[] {
  const results: { title: string; description: string; url: string }[] = [];
  const parser = /<li class="b_algo">[\s\S]*?<h2><a href="(.*?)"[^>]*>(.*?)<\/a><\/h2>[\s\S]*?<p>(.*?)<\/p>/g;

  let match;
  while ((match = parser.exec(html)) !== null) {
    results.push({
      url: decodeURIComponent(match[1]),
      title: match[2].replace(/<[^>]+>/g, ''),
      description: match[3].replace(/<[^>]+>/g, ''),
    });
  }

  return results;
}
