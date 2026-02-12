import { describe, it, expect } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";
import { WordLadderContext, WordLadderProvider } from "./WordLadderContext";
import { useContext } from "react";

describe("WordLadder context provider", () => {
  it("should pass the context to children", () => {
    const WordLadderConsumer = () => {
      const { fromWord, toWord, steps } = useContext(WordLadderContext);

      return (
        <>
          <div>fromWord = "{fromWord}"</div>
          <div>toWord = "{toWord}"</div>
          <div>steps = {steps}"</div>
        </>
      );
    };

    const TestApp = () => {
      return (
        <WordLadderProvider>
          <WordLadderConsumer />
        </WordLadderProvider>
      );
    };

    render(<TestApp />);

    expect(screen.getByText(/fromWord = ""/i)).toBeInTheDocument();
    expect(screen.getByText(/toWord = ""/i)).toBeInTheDocument();
    expect(screen.getByText(/steps = 0/i)).toBeInTheDocument();
  });

  it("should allow starting a new game", () => {
    const WordLadderConsumer = () => {
      const { fromWord, toWord, steps, newGame, startGame, hasWord } =
        useContext(WordLadderContext);

      const handleNewGame = () => {
        const wordList = ["cat", "'cot", "cog", "dog"];
        newGame({ wordList });
      };

      const handleStartGame = () => {
        startGame(4);
      };

      return (
        <>
          <button onClick={handleNewGame}>New Game</button>
          <button onClick={handleStartGame}>Start Game</button>
          <div>fromWord = "{fromWord}"</div>
          <div>toWord = "{toWord}"</div>
          <div>steps = {steps}</div>
          <div>"cat" {hasWord("cat") ? "is" : "is not"} in the word list</div>
        </>
      );
    };

    const TestApp = () => {
      return (
        <WordLadderProvider>
          <WordLadderConsumer />
        </WordLadderProvider>
      );
    };

    render(<TestApp />);

    expect(screen.getByText(/fromWord = ""/i)).toBeInTheDocument();
    expect(screen.getByText(/toWord = ""/i)).toBeInTheDocument();
    expect(screen.getByText(/steps = 0/i)).toBeInTheDocument();
    expect(
      screen.getByText(/"cat" is not in the word list/i),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(/new game/i));

    expect(screen.getByText(/"cat" is in the word list/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/start game/i));

    expect(screen.getByText(/fromWord = "(?:cat|dog)"/i)).toBeInTheDocument();
    expect(screen.getByText(/toWord = "(?:dog|cat)"/i)).toBeInTheDocument();
    expect(screen.getByText(/steps = 4/i)).toBeInTheDocument();
  });
});
