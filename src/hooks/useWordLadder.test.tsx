import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { useWordLadder } from "./useWordLadder";

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
    const TestApp = () => {
      const { fromWord, toWord, steps } = useWordLadder({
        wordList: ["cat", "cot", "cog", "dog"],
        path: ["cat", "cot", "cog", "dog"],
      });
      console.log(fromWord, toWord, steps);
      return (
        <>
          <div>{`fromWord = "${fromWord}"`}</div>
          <div>{`toWord = "${toWord}"`}</div>
          <div>{`steps = ${steps}`}</div>
        </>
      );
    };

    render(<TestApp />);

    expect(screen.getByText('fromWord = "cat"')).toBeInTheDocument();
    expect(screen.getByText('toWord = "dog"')).toBeInTheDocument();
    expect(screen.getByText("steps = 4")).toBeInTheDocument();
  });

  it("should test if the word is in the list", () => {
    const word1 = "cat";
    const word2 = "fat";

    const TestApp = () => {
      const { hasWord } = useWordLadder({
        wordList: ["cat", "cot", "cog", "dog"],
      });
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

    render(<TestApp />);

    expect(screen.getByText(`${word1} is in the list`)).toBeInTheDocument();
    expect(screen.getByText(`${word2} is not in the list`)).toBeInTheDocument();
  });

  it("should test if two words are neighbors", () => {
    const word1 = "cat";
    const word2 = "fat";
    const word3 = "fan";

    const TestApp = () => {
      const { areNeighbors } = useWordLadder({
        wordList: ["cat", "cot", "cog", "dog"],
      });
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

    render(<TestApp />);

    expect(
      screen.getByText(`${word1} and ${word2} are neighbors`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${word1} and ${word3} are not neighbors`),
    ).toBeInTheDocument();
  });
});
