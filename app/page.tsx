// app/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const encoded = encodeURIComponent(query.trim())
    router.push(`/search?q=${encoded}`)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white mb-8">
        Kimutichan Search
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex items-center border rounded-full shadow-lg overflow-hidden bg-white dark:bg-gray-800"
      >
        <input
          type="text"
          className="flex-grow px-6 py-4 text-lg text-gray-900 dark:text-white bg-transparent outline-none"
          placeholder="検索ワード または URL を入力..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-4 bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
        >
          検索
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Powered by Kimutichan / No external APIs
      </p>
    </main>
  )
}
