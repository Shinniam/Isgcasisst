// app/page.tsx
import { SearchForm } from '@/components/SearchForm';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Kimutichan Search
        </h1>
        <p className="text-gray-500 text-lg">
          軽量・超高速・高互換プロキシ検索エンジン
        </p>

        <SearchForm />

        <footer className="text-gray-400 text-xs mt-10">
          © 2025 Kimutichan Project
        </footer>
      </div>
    </main>
  );
}
