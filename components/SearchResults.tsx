// components/SearchResults.tsx
'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SearchResults({ query }: { query: string }) {
  const { data, error } = useSWR(query ? `/api/search?q=${encodeURIComponent(query)}` : null, fetcher);

  if (error) return <div className="text-center text-red-500">エラーが発生しました。</div>;
  if (!data) return <div className="text-center text-gray-400">検索中...</div>;
  if (!data.results?.length) return <div className="text-center text-gray-400">結果が見つかりませんでした。</div>;

  return (
    <div className="space-y-6">
      {data.results.map((item: any, index: number) => (
        <a
          key={index}
          href={item.url}
          className="block p-4 border rounded-lg hover:bg-gray-100 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="text-lg font-semibold text-blue-600">{item.title}</h2>
          <p className="text-sm text-gray-600">{item.description}</p>
          <span className="text-xs text-gray-400">{item.url}</span>
        </a>
      ))}
    </div>
  );
}
