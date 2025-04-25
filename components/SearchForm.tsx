// components/SearchForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchForm() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="検索ワードを入力..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-5 py-3 rounded-l-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-3 rounded-r-2xl hover:bg-blue-600 transition"
      >
        検索
      </button>
    </form>
  );
}
