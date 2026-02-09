import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawData: [string, number][] = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../public/wordfreq-en-25000-log.json'),
    'utf-8'
  )
);

for (let length = 3; length <= 7; length++) {
  const words = rawData
    .map(([word, _freq]) => word.toLowerCase().replaceAll(/[^a-z]/g, ''))
    .filter((word) => word.length === length)
    .toSorted();

  console.log(`Writing list for ${length}-letter words...`);

  fs.writeFileSync(
    path.join(__dirname, `../public/word-list-${length}-letter.json`),
    JSON.stringify(words),
    'utf-8'
  );

  console.log(`List for ${length}-letter words saved.`);
}
