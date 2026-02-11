/**
 * The WordLadderGame class implements the game logic given a list
 * of words.
 */
import WordGraph from "../WordGraph";

export class WordLadderGame {
  private _wordGraph: WordGraph;
  private _path: string[];
  private _minNeighbors: number;
  private _startWords: string[];

  /**
   * Construct a new game instance.
   *
   * @param {sting[]} wordList The initial list of words
   * @param {string[]} path Optional default path
   * @param {number} minNeighbors Minimum neighbors for start words
   */
  constructor(
    wordList: string[],
    path: string[] = [],
    minNeighbors: number = 1,
  ) {
    this._wordGraph = new WordGraph(wordList);
    this._path = path;
    this._minNeighbors = minNeighbors;
    this._startWords = this._getStartWords();
  }

  /**
   * Return an iterator to the list of words.
   *
   * @returns {MapIterator<string>}
   */
  words(): MapIterator<string> {
    return this._wordGraph.words();
  }

  /**
   * Test if a word is in the graph.
   *
   * @param {string} word
   * @returns {boolean}
   */
  hasWord(word: string): boolean {
    return this._wordGraph.hasWord(word);
  }

  /**
   * Return the starting word for the current game. Returns an
   * empty string if no path has been generated.
   *
   * @returns {string}
   */
  get fromWord(): string {
    return this._path.length > 0 ? this._path[0]! : "";
  }

  /**
   * Return the target word for the current game. Returns an
   * empty string if no path has been generated.
   *
   * @returns {string}
   */
  get toWord(): string {
    return this._path.length > 0 ? this._path.at(-1)! : "";
  }

  /**
   * Returns the path length for the current game.
   *
   * @returns {number}
   */
  get steps(): number {
    return this._path.length;
  }

  /**
   * Generate a random path of given length from the word graph.
   *
   * @param {number} length
   */
  startGame(length: number): void {
    let path: string[] = [];

    while (path.length < length) {
      let startWord = this._getRandomStartWord();
      if (startWord === "") break;

      path = this._wordGraph.findRandomPath(startWord, length);
    }

    this._path = path;
  }

  private _getRandomStartWord(): string {
    const randomIndex = Math.floor(this._startWords.length * Math.random());
    return this._startWords[randomIndex];
  }

  private _getStartWords(): string[] {
    return Array.from(this.words()).filter((word) => {
      const neighbors = this._wordGraph.getNeighbors(word)!;
      return neighbors.length >= this._minNeighbors;
    });
  }
}
