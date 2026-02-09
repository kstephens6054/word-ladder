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

  addWord(word: string): void {
    if (!this.words.has(word)) {
      this.words.set(word, []);
      this.updateNeighbors(word);
    }
  }

  getNeighbors(word: string): string[] | undefined {
    return this.words.get(word);
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
