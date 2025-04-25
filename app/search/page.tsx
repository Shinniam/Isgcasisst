// app/search/page.tsx
import { Suspense } from 'react';
import { SearchResults } from '@/components/SearchResults';

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q || '';

  return (
    <main className="flex flex-col items-center min-h-screen bg-white px-4 py-8">
      <div className="w-full max-w-4xl">
        <Suspense fallback={<p className="text-center text-gray-500">検索中...</p>}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </main>
  );
}
