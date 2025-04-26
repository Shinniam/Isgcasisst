// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="p-4 text-center text-lg font-bold text-gray-700">Kimutichan Search</header>
      <main className="flex flex-1 flex-col items-center justify-center">
        <form onSubmit={handleSearch} className="w-full max-w-md flex flex-col items-center">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="mt-4 px-6 py-2 rounded-full bg-green-400 text-white hover:bg-green-500 transition"
          >
            検索
          </button>
        </form>
      </main>
      <footer className="p-4 text-center text-xs text-gray-400">© 2025 Kimutichan</footer>
    </div>
  );
}
