// app/page.tsx
'use client';

import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      setResults(json.results || []);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 mt-12 text-center">Kimutichan Search</h1>

      <div className="w-full max-w-2xl">
        <div className="flex">
          <input
            type="text"
            placeholder="検索ワードを入力..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />
          <button
            onClick={handleSearch}
            className="p-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-r-xl text-lg"
          >
            検索
          </button>
        </div>
      </div>

      {loading && <div className="mt-8 text-gray-600">検索中...</div>}

      <div className="w-full max-w-2xl mt-8 space-y-6">
        {results.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-600 hover:underline">
              {item.title || item.url}
            </a>
            <p className="text-gray-700 mt-2">{item.snippet}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
