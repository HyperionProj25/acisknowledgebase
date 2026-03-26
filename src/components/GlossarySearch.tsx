"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import content from "@/lib/content";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "rl", label: "RL Concepts" },
  { key: "data", label: "Data" },
  { key: "infra", label: "Infrastructure" },
  { key: "baseball", label: "Baseball" },
  { key: "product", label: "Product" },
];

export default function GlossarySearch() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filtered = content.glossary.filter((term) => {
    const matchesSearch =
      search === "" ||
      term.term.toLowerCase().includes(search.toLowerCase()) ||
      term.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || term.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <input
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-surface-border-strong bg-surface-elevated text-white placeholder:text-white/30 focus:border-brand-gold focus:outline-none transition-colors text-sm"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.key
                ? "bg-brand-gold text-surface-base"
                : "bg-surface-elevated text-white/50 hover:bg-surface-border-strong hover:text-white/70"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-white/40 mb-4">
        {filtered.length} term{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Terms list */}
      <div className="space-y-2">
        {filtered.map((term, i) => (
          <motion.div
            key={term.term}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.5) }}
          >
            <button
              onClick={() =>
                setExpandedTerm(expandedTerm === term.term ? null : term.term)
              }
              className={`w-full text-left rounded-xl border-2 transition-all ${
                expandedTerm === term.term
                  ? "border-brand-gold bg-brand-gold/5"
                  : "border-surface-border-strong bg-surface-elevated hover:border-brand-gold/40"
              }`}
            >
              <div className="p-4 flex items-center gap-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  expandedTerm === term.term
                    ? "bg-brand-gold/15 text-brand-gold"
                    : "bg-surface-base text-white/40"
                }`}>
                  {term.category}
                </span>
                <h3 className="font-bold text-white flex-1">{term.term}</h3>
                <ChevronDown
                  className={`w-4 h-4 text-white/30 transition-transform shrink-0 ${
                    expandedTerm === term.term ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>
            <AnimatePresence>
              {expandedTerm === term.term && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-1 bg-brand-gold/5 rounded-b-xl border-2 border-t-0 border-brand-gold -mt-1">
                    <p className="text-sm text-white/60 leading-relaxed">
                      {term.definition}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-white/40">
            <p className="text-lg mb-2">No terms found</p>
            <p className="text-sm">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
