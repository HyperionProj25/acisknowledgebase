#!/usr/bin/env node
/**
 * ACIS Knowledge Base language lint.
 *
 * Fails the build if live content or code contains:
 *   1. Banned framing: "injury prediction" / "injury prevention" and close
 *      variants (predicts injuries, preventing injury, injury-predicting...)
 *   2. Em dashes (U+2014) in copy
 *   3. Retired proof-of-concept numbers presented as current
 *   4. Retired proof-of-concept tech presented as current
 *
 * Scope: content/** and src/** EXCEPT paths containing an "archive" segment.
 * The archive is a preserved historical record behind a banner and is exempt.
 *
 * Escape hatch: a line containing "lint-language-disable-line" (put it in an
 * inline MDX comment) is skipped. This exists ONLY for lines that MENTION a
 * banned phrase while stating the ban, e.g. the GTM Rails do-not-say list.
 * Never use it on actual product copy.
 *
 * Run directly: node scripts/lint-language.mjs
 */

const DISABLE_MARKER = "lint-language-disable-line";

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["content", "src"];
const SCAN_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".json",
  ".css",
  ".md",
  ".mdx",
]);

const RULES = [
  {
    id: "banned-phrase",
    description:
      'Banned framing: never "injury prediction" / "injury prevention" or variants',
    patterns: [
      /\binjur\w*[\s-]+(?:prediction|prevention|predicti\w*|predict\w*|prevent\w*)\b/i,
      /\b(?:predict|prevent)\w*[\s-]+(?:\w+[\s-]+){0,2}injur\w*/i,
    ],
  },
  {
    id: "em-dash",
    description: "Em dashes are not allowed in copy",
    patterns: [/—/],
  },
  {
    id: "retired-number",
    description:
      "Retired POC number: update from src/lib/canonical.ts instead",
    patterns: [
      /7\.75\s*(?:M\b|million)/i,
      /\b750\s*K\b/i,
      /\b750,000\b/,
      /\b0\.818\b/,
      /\b15\.2\s*%/,
      /\b6\.8\s*%/,
      /\b5\.2\s*%/,
    ],
  },
  {
    id: "retired-tech",
    description:
      "Retired POC tech referenced outside the archive (PPO/SB3/Gymnasium/Streamlit era)",
    patterns: [
      /\bPPO\b/,
      /\bSB3\b/,
      /stable[\s-]?baselines/i,
      /\bgymnasium\b/i,
      /\bstreamlit\b/i,
      /proximal policy optimization/i,
    ],
  },
];

function isExemptPath(relPath) {
  return relPath.split(path.sep).includes("archive");
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

const violations = [];

for (const dir of SCAN_DIRS) {
  for (const file of walk(path.join(ROOT, dir))) {
    const relPath = path.relative(ROOT, file);
    if (isExemptPath(relPath)) continue;
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (line.includes(DISABLE_MARKER)) return;
      for (const rule of RULES) {
        for (const pattern of rule.patterns) {
          const match = line.match(pattern);
          if (match) {
            violations.push({
              file: relPath,
              line: i + 1,
              rule: rule.id,
              description: rule.description,
              excerpt: match[0],
            });
          }
        }
      }
    });
  }
}

if (violations.length > 0) {
  console.error(`\nLanguage lint FAILED: ${violations.length} violation(s)\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  [${v.rule}]  "${v.excerpt}"`);
    console.error(`    ${v.description}\n`);
  }
  console.error(
    "See the Language Rules section of CLAUDE.md. Archive paths are exempt;\n" +
      "live content and code must not carry banned phrases, em dashes, or\n" +
      "retired POC numbers/tech.\n"
  );
  process.exit(1);
}

console.log("Language lint passed.");
