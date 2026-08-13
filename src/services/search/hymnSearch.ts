import type { Hymn } from "@/types/hymn";

/** Normalise Dholuo text for matching: lowercase, strip apostrophes/diacritics/punctuation. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`ʼ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface SearchResult {
  hymn: Hymn;
  score: number;
}

/**
 * Ranked search across hymn number, title and lyrics.
 * Higher score = better match. Pure function — no React, no storage.
 */
export function searchHymns(hymns: Hymn[], rawQuery: string): SearchResult[] {
  const q = normalize(rawQuery);
  if (!q) return hymns.map((hymn) => ({ hymn, score: 0 }));

  const terms = q.split(" ").filter(Boolean);
  const asNum = Number(rawQuery.trim());
  const results: SearchResult[] = [];

  for (const hymn of hymns) {
    const title = normalize(hymn.title);
    const lyrics = normalize(hymn.lyrics);
    const numStr = String(hymn.number);
    let score = 0;

    if (!Number.isNaN(asNum) && hymn.number === asNum) score += 1000;
    else if (numStr.startsWith(q)) score += 300;
    else if (numStr.includes(q)) score += 120;

    if (title === q) score += 800;
    else if (title.startsWith(q)) score += 400;
    else if (title.includes(q)) score += 200;

    for (const term of terms) {
      if (title.includes(term)) score += 60;
      if (lyrics.includes(term)) score += 20;
    }

    if (score > 0) results.push({ hymn, score });
  }

  return results.sort(
    (a, b) => b.score - a.score || a.hymn.number - b.hymn.number,
  );
}
