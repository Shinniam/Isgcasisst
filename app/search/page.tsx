// app/search/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        // ここでサーバー側のAPIに問い合わせ
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        } else {
          console.error('検索失敗');
        }
      } catch (e) {
        console.error('通信エラー', e);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <main className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        「{query}」の検索結果
      </h1>

      {loading && <p className="text-gray-500">検索中...</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-500">結果が見つかりませんでした。</p>
      )}

      <ul className="space-y-4">
        {results.map((result, index) => (
          <li key={index}>
            <a
              href={result}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {result}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
