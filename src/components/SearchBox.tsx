"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Search } from "lucide-react";
import { Document } from "flexsearch";

interface SearchEntry {
  id: string;
  href: string;
  title: string;
  status: string;
  text: string;
}

interface SearchResult {
  id: string;
  href: string;
  title: string;
  snippet: string;
}

// Minimal typing for the FlexSearch Document index (ids only, no enrich)
type DocIndex = {
  add: (doc: SearchEntry) => void;
  search: (
    query: string,
    options: { limit: number }
  ) => Array<{ field: string; result: Array<string | number> }>;
};

function makeSnippet(text: string, query: string, radius = 70): string {
  const firstTerm = query.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  const at = firstTerm ? text.toLowerCase().indexOf(firstTerm) : -1;
  if (at < 0) return text.slice(0, radius * 2) + (text.length > radius * 2 ? "..." : "");
  const start = Math.max(0, at - radius);
  const end = Math.min(text.length, at + radius);
  return (
    (start > 0 ? "..." : "") + text.slice(start, end) + (end < text.length ? "..." : "")
  );
}

export default function SearchBox() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loadState, setLoadState] = useState<"idle" | "ready" | "error">("idle");
  const indexRef = useRef<DocIndex | null>(null);
  const entriesRef = useRef<Map<string, SearchEntry>>(new Map());
  const inputRef = useRef<HTMLInputElement>(null);

  const ensureIndex = useCallback(async () => {
    if (indexRef.current) return;
    try {
      const res = await fetch("/search-index.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const entries: SearchEntry[] = await res.json();
      const index = new Document({
        tokenize: "forward",
        document: { id: "id", index: ["title", "text"] },
      }) as unknown as DocIndex;
      for (const entry of entries) {
        index.add(entry);
        entriesRef.current.set(entry.id, entry);
      }
      indexRef.current = index;
      setLoadState("ready");
    } catch {
      setLoadState("error");
    }
  }, []);

  // Cmd/Ctrl+K to open, Escape to close
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    ensureIndex();
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open, ensureIndex]);

  useEffect(() => {
    const index = indexRef.current;
    if (!index || !query.trim()) {
      setResults([]);
      return;
    }
    const hits = index.search(query, { limit: 8 });
    const seen = new Set<string>();
    const merged: SearchResult[] = [];
    for (const field of hits) {
      for (const id of field.result) {
        const key = String(id);
        if (seen.has(key)) continue;
        seen.add(key);
        const entry = entriesRef.current.get(key);
        if (!entry) continue;
        merged.push({
          id: key,
          href: entry.href,
          title: entry.title,
          snippet: makeSnippet(entry.text, query),
        });
      }
    }
    setResults(merged.slice(0, 8));
  }, [query]);

  function close() {
    setOpen(false);
    setQuery("");
    setResults([]);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors text-sm"
        aria-label="Search the knowledge base"
      >
        <Search size={14} />
        <span className="hidden xl:inline">Search</span>
        <kbd className="hidden xl:inline text-[10px] font-mono border border-white/15 rounded px-1 py-0.5 text-white/30">
          Ctrl K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-[80]"
              onClick={close}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="fixed left-1/2 top-24 -translate-x-1/2 w-[min(560px,calc(100vw-2rem))] z-[90] bg-surface-elevated border border-surface-border-strong rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 border-b border-surface-border">
                <Search size={16} className="text-white/30 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && results[0]) {
                      router.push(results[0].href);
                      close();
                    }
                  }}
                  placeholder="Search the knowledge base..."
                  className="w-full bg-transparent py-3.5 text-sm text-white placeholder:text-white/25 outline-none"
                />
              </div>

              <div className="max-h-[50vh] overflow-y-auto">
                {loadState === "error" && (
                  <p className="px-4 py-6 text-sm text-white/40">
                    Search index unavailable. Run npm run build:search and reload.
                  </p>
                )}
                {loadState !== "error" && query.trim() && results.length === 0 && (
                  <p className="px-4 py-6 text-sm text-white/40">No results.</p>
                )}
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.href}
                    onClick={close}
                    className="block px-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-white">
                      <FileText size={13} className="text-brand-gold shrink-0" />
                      {result.title}
                    </span>
                    <span className="block text-xs text-white/40 mt-1 leading-relaxed">
                      {result.snippet}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
