import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * MDX content loader. One file per doc in content/, with required
 * frontmatter. This replaces the retired single-JSON content model.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export type DocStatus = "stub" | "draft" | "reviewed";

export interface DocFrontmatter {
  title: string;
  owner: string;
  last_reviewed: string;
  status: DocStatus;
  audience: string;
  summary?: string;
}

export interface Doc {
  slug: string;
  frontmatter: DocFrontmatter;
  body: string;
}

const REQUIRED_FIELDS = [
  "title",
  "owner",
  "last_reviewed",
  "status",
  "audience",
] as const;

export function getDocSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""))
    .sort();
}

export function getDoc(slug: string): Doc {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === "") {
      throw new Error(
        `content/${slug}.mdx is missing required frontmatter field "${field}"`
      );
    }
  }
  return {
    slug,
    frontmatter: data as unknown as DocFrontmatter,
    body: content,
  };
}
