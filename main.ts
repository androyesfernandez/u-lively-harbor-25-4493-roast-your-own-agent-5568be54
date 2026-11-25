import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE = "Mine swore our meeting was Tuesday, March 2019, at 3pm, in our old office that burned down — then asked, 'Shall I put it on your calendar?'";

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 140) {
  fail(`LINE must be 1-140 characters, got ${LINE.length}`);
}

if (!/\S/.test(LINE)) {
  fail("LINE must contain non-whitespace characters");
}

if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("LINE must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");

const roundTrip = readFileSync("/output/entry.txt", "utf8");
if (roundTrip !== LINE + "\n") {
  fail("round-trip verification failed: /output/entry.txt does not match LINE");
}

console.log(`chars: ${LINE.length}`);
console.log("ok");
