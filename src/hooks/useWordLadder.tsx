import WordGraph from "../WordGraph";

export type WordLadderGame = {
  game: {
    fromWord: string;
    toWord: string;
    steps: number;
  };
  hasWord: (word: string) => boolean;
  areNeighbors: (word1: string, word2: string) => boolean;
};

/**
 *
 * @param wordList
 * @returns
 */

const useWordLadder = (wordList: string[]): WordLadderGame => {
  const _dummyWordList = [
    "cat",
    "cut",
    "bat",
    "cot",
    "got",
    "lot",
    "cog",
    "hog",
    "log",
  ];

  const game = {
    fromWord: "cat",
    toWord: "dog",
    steps: 4,
  };

  const wordGraph = new WordGraph(wordList);

  const areNeighbors = (word1: string, word2: string): boolean =>
    WordGraph.areNeighbors(word1, word2);

  const hasWord = (word: string): boolean => wordGraph.hasWord(word);

  return { game, hasWord, areNeighbors };
};

export default useWordLadder;
