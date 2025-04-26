// lib/charset.ts
export function detectCharset(contentType: string, bodyText: string): string {
  // Content-Typeヘッダにcharsetが含まれてる場合
  const match = contentType.match(/charset=([\w-]+)/i);
  if (match) {
    return match[1].toLowerCase();
  }

  // HTML内の<meta charset="">を探す
  const metaMatch = bodyText.match(
    /<meta[^>]+charset=["']?([\w-]+)["']?/i
  );
  if (metaMatch) {
    return metaMatch[1].toLowerCase();
  }

  return 'utf-8'; // デフォルト
}
