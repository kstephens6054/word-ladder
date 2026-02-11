import { describe, it, expect } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";
import { useWordLadder } from "./useWordLadder";
import type { UseWordLadderProperties } from "./useWordLadder";

describe("useWordLadder hook", () => {
  it("should initialize with an empty path", () => {
    const TestApp = () => {
      const { fromWord, toWord, steps } = useWordLadder({ wordList: [] });
      return (
        <>
          <div>{`fromWord = "${fromWord}"`}</div>
          <div>{`toWord = "${toWord}"`}</div>
          <div>{`steps = ${steps}`}</div>
        </>
      );
    };

    render(<TestApp />);

    expect(screen.getByText('fromWord = ""')).toBeInTheDocument();
    expect(screen.getByText('toWord = ""')).toBeInTheDocument();
    expect(screen.getByText("steps = 0")).toBeInTheDocument();
  });

  it("should initialize from the given path", () => {
    const TestApp = (props: UseWordLadderProperties) => {
      const { fromWord, toWord, steps } = useWordLadder(props);

      return (
        <>
          <div>{`fromWord = "${fromWord}"`}</div>
          <div>{`toWord = "${toWord}"`}</div>
          <div>{`steps = ${steps}`}</div>
        </>
      );
    };

    const wordList = ["cat", "cot", "cog", "dog"];
    const path = ["cat", "cot", "cog", "dog"];

    render(<TestApp wordList={wordList} path={path} />);

    expect(screen.getByText('fromWord = "cat"')).toBeInTheDocument();
    expect(screen.getByText('toWord = "dog"')).toBeInTheDocument();
    expect(screen.getByText("steps = 4")).toBeInTheDocument();
  });

  it("should test if the word is in the list", () => {
    const TestApp = (props: UseWordLadderProperties) => {
      const { hasWord } = useWordLadder(props);
      return (
        <>
          <div>
            {`${word1} ${hasWord(word1) ? "is" : "is not"} in the list`}
          </div>
          <div>
            {`${word2} ${hasWord(word2) ? "is" : "is not"} in the list`}
          </div>
        </>
      );
    };

    const word1 = "cat";
    const word2 = "fat";
    const wordList = ["cat", "cot", "cog", "dog"];

    render(<TestApp wordList={wordList} />);

    expect(screen.getByText(`${word1} is in the list`)).toBeInTheDocument();
    expect(screen.getByText(`${word2} is not in the list`)).toBeInTheDocument();
  });

  it("should test if two words are neighbors", () => {
    const TestApp = ({ wordList }: UseWordLadderProperties) => {
      const { areNeighbors } = useWordLadder({ wordList });
      return (
        <>
          <div>
            {`${word1} and ${word2} ${
              areNeighbors(word1, word2) ? "are" : "are not"
            } neighbors`}
          </div>
          <div>
            {`${word1} and ${word3} ${
              areNeighbors(word1, word3) ? "are" : "are not"
            } neighbors`}
          </div>
        </>
      );
    };

    const word1 = "cat";
    const word2 = "fat";
    const word3 = "fan";
    const wordList: string[] = [];

    render(<TestApp wordList={wordList} />);

    expect(
      screen.getByText(`${word1} and ${word2} are neighbors`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${word1} and ${word3} are not neighbors`),
    ).toBeInTheDocument();
  });

  it("should generate a new random path", () => {
    const TestApp = (props: UseWordLadderProperties) => {
      const { fromWord, toWord, steps, startGame } = useWordLadder(props);

      const handleStartgame = () => {
        startGame(4);
      };

      return (
        <>
          <button onClick={handleStartgame}>Start Game</button>
          <div>{`fromWord = "${fromWord}"`}</div>
          <div>{`toWord = "${toWord}"`}</div>
          <div>{`steps = ${steps}`}</div>
        </>
      );
    };

    const wordList = JSON.parse(`[
      "cat", "hat",
      "cut", "hut",
      "cot", "hot", "got", "lot",
      "cog", "hog", "log", "fog",
      "dog"
    ]`);

    render(<TestApp wordList={wordList} minNeighbors={2} />);

    expect(screen.getByText(/fromWord = ""/i)).toBeInTheDocument();
    expect(screen.getByText(/toWord = ""/i)).toBeInTheDocument();
    expect(screen.getByText(/steps = 0/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/start game/i));

    expect(screen.getByText(/fromWord = "[a-z]{3}"/i)).toBeInTheDocument();
    expect(screen.getByText(/toWord = "[a-z]{3}"/i)).toBeInTheDocument();
    expect(screen.getByText(/steps = 4/i)).toBeInTheDocument();
  });

  it("should reset thhe game with a new word list", () => {
    const TestApp = (props: UseWordLadderProperties) => {
      const { fromWord, toWord, steps, startGame, newGame } =
        useWordLadder(props);

      const handleStartgame = () => {
        startGame(4);
      };

      const handleNewGame = () => {
        newGame({ wordList: ["hat", "hot", "hog", "log"] });
      };

      return (
        <>
          <button onClick={handleStartgame}>Start Game</button>
          <button onClick={handleNewGame}>New Game</button>
          <div>{`fromWord = "${fromWord}"`}</div>
          <div>{`toWord = "${toWord}"`}</div>
          <div>{`steps = ${steps}`}</div>
        </>
      );
    };

    const wordList = ["cat", "cot", "cog", "dog"];
    render(<TestApp wordList={wordList} minNeighbors={1} />);

    fireEvent.click(screen.getByText(/start game/i));

    expect(screen.getByText(/fromWord = "(?:cat|dog)"/i)).toBeInTheDocument();
    expect(screen.getByText(/toWord = "(?:dog|cat)"/i)).toBeInTheDocument();
    expect(screen.getByText(/steps = 4/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/new game/i));

    expect(screen.getByText(/fromWord = ""/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/start game/i));

    expect(screen.getByText(/fromWord = "(?:hat|log)"/i)).toBeInTheDocument();
    expect(screen.getByText(/toWord = "(?:log|hat)"/i)).toBeInTheDocument();
    expect(screen.getByText(/steps = 4/i)).toBeInTheDocument();
  });
});
