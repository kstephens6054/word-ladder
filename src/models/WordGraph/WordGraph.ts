/**
 * The WordGraph class implements a graph from a list
 * of words having edges that link all words of the same
 * length that differ by a single letter.
 *
 * While this implementation does not enforce any constraints
 * regarding character case or type, we assume that all words
 * will consist of lowercase alphabetic characters.
 */
export class WordGraph {
  private adjacencyMap: Map<string, string[]>;

  /**
   * Construct a new empty graph and optionally populate
   * the graph from an initial word list.
   *
   * @param {string[]} wordList The initial list of words
   */
  constructor(wordList: string[] = []) {
    this.adjacencyMap = new Map();
    if (wordList.length > 0) {
      for (const word of wordList) {
        this.addWord(word);
      }
    }
  }

  /**
   * Create a new WordGraph object from an existing adjacency
   * list.
   *
   * @param {[string, string[]][]} entries
   * @returns <WordGraph>
   */
  static fromEntries(entries: [string, string[]][]): WordGraph {
    const graph = new WordGraph();
    for (const [word, neighbors] of entries) {
      graph.adjacencyMap.set(word, neighbors);
    }
    return graph;
  }

  /**
   * Return an iterator to the list of words.
   *
   * @returns {MapIterator<string>}
   */
  get words(): MapIterator<string> {
    return this.adjacencyMap.keys();
  }

  /**
   * Return the number of words in the graph.
   *
   * @returns {number}
   */
  get size(): number {
    return this.adjacencyMap.size;
  }

  /**
   * Add a new word to the graph and update the adjacency list.
   *
   * @param {string} word The new word.
   */
  addWord(word: string): void {
    if (!this.adjacencyMap.has(word)) {
      this.adjacencyMap.set(word, []);
      this.updateNeighbors(word);
    }
  }

  /**
   * Return the adjacency list for a given word or
   * undefinend if the word is not in the graph.
   *
   * @param {string} word The word to search for.
   * @returns {string[] | undefined}
   */
  getNeighbors(word: string): string[] | undefined {
    return this.adjacencyMap.get(word);
  }

  /**
   * Returns all paths in the graph from a given starting word.
   * If the optional maxLength argument is specified, the search will
   * stop beyond the given depth.
   *
   * @param {string} start
   * @param {number | undefined} maxDepth Maximuum search depth
   * @returns
   */
  findAllPaths(
    start: string,
    maxLength: number | undefined = undefined,
  ): string[][] {
    const paths: string[][] = [];
    const queue: { word: string; path: string[] }[] = [
      { word: start, path: [start] },
    ];

    while (queue.length > 0) {
      const { word, path } = queue.shift()!;
      if (maxLength !== undefined && path.length >= maxLength) continue;

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

  /**
   * Return all paths from a given starting word having the specified
   * length.
   *
   * @param {string} start
   * @param {number} length
   * @returns {string[][]}
   */
  findAllPathsByLength(start: string, length: number): string[][] {
    return this.findAllPaths(start, length).filter(
      (path) => path.length >= length,
    );
  }

  /**
   * Update the adjacency list for a new word.
   *
   * @private
   * @param {string} word
   */
  private updateNeighbors(word: string): void {
    for (const [
      existingWord,
      existingNeighbors,
    ] of this.adjacencyMap.entries()) {
      if (WordGraph.areNeighbors(word, existingWord)) {
        this.adjacencyMap.get(word)?.push(existingWord);
        existingNeighbors.push(word);
      }
    }
  }

  /**
   * Is the word in the graph?
   *
   * @param {string} word
   * @returns {boolean}
   */
  hasWord(word: string): boolean {
    return this.adjacencyMap.has(word);
  }

  /**
   * Are these two words adjacent?
   *
   * @static
   *
   * @param {string} word1
   * @param {string} word2
   * @returns {boolean}
   */
  static areNeighbors(word1: string, word2: string): boolean {
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
