import { useEffect, useState } from "react";
import { WordLadderGame } from "../models/WordLadderGame";

export type UseWordLadderProperties = {
  wordList: string[];
  path?: string[];
  minNeighbors?: number;
};

/**
 * The useWordLadder hook provides the game logic for the Word Ladder
 * game.
 *
 * @param {object} props
 * @param {string[]} props.wordList
 * @param {string[]} props.path
 * @param {number} props.minNeighbors
 *
 * @returns {object}
 */
const useWordLadder = ({
  wordList,
  path,
  minNeighbors,
}: UseWordLadderProperties) => {
  const [game, setGame] = useState<WordLadderGame>(
    () => new WordLadderGame(wordList, path, minNeighbors),
  );

  const [fromWord, setFromWord] = useState<string>(() => game.fromWord);
  const [toWord, setToWord] = useState<string>(() => game.toWord);
  const [steps, setsteps] = useState<number>(() => game.steps);

  useEffect(() => {
    setFromWord(() => game.fromWord);
    setToWord(() => game.toWord);
    setsteps(() => game.steps);
  }, [game]);

  /**
   * Re-initialize the game with a new word list. Refer to the
   * useWordLadder initializers for details.
   *
   * @param {UseWordLadderProperties}
   */
  const newGame = ({
    wordList,
    path = [],
    minNeighbors = 1,
  }: UseWordLadderProperties): void => {
    setGame(() => new WordLadderGame(wordList, path, minNeighbors));
  };

  /**
   * Start a new game with a random path. This forces an update
   * of the game status.
   *
   * @param {number} steps Number of steps for the random path
   */
  const startGame = (steps: number): void => {
    game.startGame(steps);
    setFromWord(() => game.fromWord);
    setToWord(() => game.toWord);
    setsteps(() => game.steps);
  };

  /**
   * Test if two words are neighbors.
   *
   * @param {string} word1
   * @param {string} word2
   * @returns {boolean}
   */
  const areNeighbors = (word1: string, word2: string): boolean =>
    game.areNeighbors(word1, word2);

  /**
   * Is a word in theh word list?
   *
   * @param {string} word
   * @returns {boolean}
   */
  const hasWord = (word: string): boolean => game.hasWord(word);

  return {
    fromWord,
    toWord,
    steps,
    newGame,
    startGame,
    hasWord,
    areNeighbors,
  } as const;
};

export { useWordLadder };
