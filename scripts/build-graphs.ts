import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { WordGraph } from "../src/WordGraph/WordGraph.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

for (let length = 3; length <= 7; length++) {
  const wordListPath = path.join(
    __dirname, `../public/word-list-${length}-letter.json`
  );

  const words: string[] = JSON.parse(fs.readFileSync(wordListPath, "utf-8"));

  console.log(`Building graph for ${length}-letter words...`);

  const graph = new WordGraph(words);

  const outputPath = path.join(
    __dirname, `../public/word-graph-${length}-letter.json`
  );

  fs.writeFileSync(
    outputPath,
    JSON.stringify(Array.from(graph.words.entries())),
    "utf-8"
  );

  console.log(`Graph for ${length}-letter words saved to ${outputPath}`);
}
