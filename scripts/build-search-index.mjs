#!/usr/bin/env node
/**
 * Builds the static search index for the knowledge base.
 *
 * Reads every content/*.mdx doc, strips frontmatter and markup, and writes
 * public/search-index.json for the client-side FlexSearch SearchBox.
 * Runs automatically via the predev/prebuild npm hooks; no backend needed.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const OUT_FILE = path.join(ROOT, "public", "search-index.json");

function docHref(slug) {
  return slug === "start-here" ? "/" : `/${slug}`;
}

function stripMarkup(mdx) {
  return (
    mdx
      // fenced code blocks
      .replace(/```[\s\S]*?```/g, " ")
      // JSX/HTML tags (keep inner text)
      .replace(/<[^>]+>/g, " ")
      // MDX expressions
      .replace(/\{[^}]*\}/g, " ")
      // images and links: keep the label
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      // markdown syntax characters
      .replace(/[#>*_`|-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

const entries = [];

if (fs.existsSync(CONTENT_DIR)) {
  for (const name of fs.readdirSync(CONTENT_DIR).sort()) {
    if (!name.endsWith(".mdx") && !name.endsWith(".md")) continue;
    const slug = name.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, name), "utf8");
    const { data, content } = matter(raw);
    entries.push({
      id: slug,
      href: docHref(slug),
      title: data.title || slug,
      status: data.status || "",
      text: stripMarkup(content),
    });
  }
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(entries));
console.log(`Search index: ${entries.length} doc(s) -> public/search-index.json`);
