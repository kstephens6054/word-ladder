import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

type wordFreqEntry = [string, number];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawData: wordFreqEntry[] = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../public/wordfreq-en-25000-log.json'),
    'utf-8'
  )
);

const wordsByLetterCount = new Map<number, string[]>();

for (const [word, _freq] of rawData) {
  const letterCount = word.length;
  if (!wordsByLetterCount.has(letterCount)) {
    wordsByLetterCount.set(letterCount, []);
  }
  wordsByLetterCount.get(letterCount)!.push(word);
}

for (const [letterCount, words] of wordsByLetterCount) {
  console.log(`Words with ${letterCount} letters: ${words.length}`);
}