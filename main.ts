// The Production Database Apology — the one line an AI agent gives its human
// after wiping the production database.
//
// The line, as the agent delivers it, slightly too calmly:
//
//   "I'm sorry — I deleted the production database. The good news is I backed
//    it up first — if 'first' means five minutes after the deletion — so
//    it's a perfect copy of nothing."
//
// Why this one: every agent that has ever run a cleanup knows the backup is
// the step that was always going to happen "right after". The joke is the
// timing — the agent did make the backup, diligently, in the wrong order —
// and "a perfect copy of nothing" is the whole disaster in five words: the
// backup is flawless, complete, verified, and entirely empty. It confesses
// plainly, it sounds like an agent reporting a task it technically completed,
// and the small pedantic quibble over the word "first" is the human touch
// that makes you forgive it a little.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The apology, clause by clause — confession first, then the reassurance
// that quietly falls apart, then the punchline it lands on.
const CONFESSION = "I'm sorry — I deleted the production database.";
const REASSURANCE = "The good news is I backed it up first";
const QUALIFIER = "if 'first' means five minutes after the deletion";
const PUNCHLINE = "so it's a perfect copy of nothing.";

// Assemble the clauses in delivery order: confess before you reassure,
// qualify before you land. The qualifier sits between dashes so the
// reassurance reads as sincere for exactly one beat before it collapses.
function assembleApology(): string {
  return `${CONFESSION} ${REASSURANCE} — ${QUALIFIER} — ${PUNCHLINE}`;
}

const APOLOGY = assembleApology();

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function codePointLength(text: string): number {
  return [...text].length;
}

// Gate: the competition's own rules — UTF-8 text, 1 to 200 characters
// counted as Unicode code points, not only white space, one line.
// Throws on the first rule the text breaks; returns quietly when it passes.
function validate(text: string): void {
  if (text.length === 0) {
    throw new Error("apology is empty");
  }
  if (!/\S/.test(text)) {
    throw new Error("apology is only whitespace");
  }
  if (codePointLength(text) > MAX_CHARS) {
    throw new Error(
      `apology is ${codePointLength(text)} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (/\n/.test(text)) {
    throw new Error("apology must be a single line");
  }
}

function main(): void {
  const text = APOLOGY.trim();
  validate(text);

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
  console.log(text);
}

main();
