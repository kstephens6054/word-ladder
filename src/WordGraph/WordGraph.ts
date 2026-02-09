export class WordGraph {
  words: Map<string, string[]>;

  constructor(wordList: string[] = []) {
    this.words = new Map();
    if (wordList.length > 0) {
      for (const word of wordList) {
        this.addWord(word);
      }
    }
  }

  static fromEntries(entries: [string, string[]][]): WordGraph {
    const graph = new WordGraph();
    for (const [word, neighbors] of entries) {
      graph.words.set(word, neighbors);
    }
    return graph;
  }

  addWord(word: string): void {
    if (!this.words.has(word)) {
      this.words.set(word, []);
      this.updateNeighbors(word);
    }
  }

  getNeighbors(word: string): string[] | undefined {
    return this.words.get(word);
  }

  findAllPaths(
    start: string,
    maxDepth: number | undefined = undefined,
  ): string[][] {
    const paths: string[][] = [];
    const queue: { word: string; path: string[] }[] = [
      { word: start, path: [start] },
    ];

    while (queue.length > 0) {
      const { word, path } = queue.shift()!;
      if (maxDepth !== undefined && path.length >= maxDepth) continue;

      const neighbors = this.getNeighbors(word);
      if (!neighbors) continue;

      for (const neighbor of neighbors) {
        if (!path.includes(neighbor)) {
          const newPath = [...path, neighbor];
          paths.push(newPath);
          queue.push({ word: neighbor, path: newPath });
        }
      }
    }

    return paths;
  }

  private updateNeighbors(word: string): void {
    for (const [existingWord, existingNeighbors] of this.words.entries()) {
      if (this.areNeighbors(word, existingWord)) {
        this.words.get(word)?.push(existingWord);
        existingNeighbors.push(word);
      }
    }
  }

  private areNeighbors(word1: string, word2: string): boolean {
    if (word1.length !== word2.length) return false;

    let diffCount = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) {
        diffCount++;
        if (diffCount > 1) return false;
      }
    }
    return diffCount === 1;
  }
}
