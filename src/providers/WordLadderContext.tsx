import React, { createContext } from "react";

import { useWordLadder } from "../hooks/useWordLadder";

interface WordLadderProviderProps {
  children: React.ReactNode;
}

type WordLadderProperties = ReturnType<typeof useWordLadder>;

const initialValues: WordLadderProperties = {
  fromWord: "",
  toWord: "",
  steps: 0,
  newGame: () => {},
  startGame: () => {},
  hasWord: () => false,
  areNeighbors: () => false,
};

const WordLadderContext = createContext<WordLadderProperties>(initialValues);

const WordLadderProvider = ({ children }: WordLadderProviderProps) => {
  const props = useWordLadder({ wordList: [] });
  return <WordLadderContext value={props}>{children}</WordLadderContext>;
};

export { WordLadderContext, WordLadderProvider };
