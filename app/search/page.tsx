import { Suspense } from 'react'
import { SearchResults } from './search-results'

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q

  if (!query) {
    return <p className="text-center mt-20 text-gray-600">検索ワードを入力してください。</p>
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">検索結果：「{query}」</h1>
      <Suspense fallback={<p>読み込み中...</p>}>
        <SearchResults query={query} />
      </Suspense>
    </main>
  )
}
