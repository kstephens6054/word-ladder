// @vitest-environment node

import { describe, it, expect } from "vitest";
import { WordLadderGame } from "./WordLadderGame";

describe("WordLadderGame class", () => {
  it("should initialize from a list of words", () => {
    const wordList = ["cat", "cut", "cot", "got", "cog", "log", "dog"];
    const game = new WordLadderGame(wordList);

    expect([...game.words()]).toEqual(wordList);
  });

  it("should initialize with an empty path", () => {
    const wordList = ["cat", "cut", "cot", "got", "cog", "log", "dog"];
    const game = new WordLadderGame(wordList);

    expect(game.fromWord).toBe("");
    expect(game.toWord).toBe("");
    expect(game.steps).toBe(0);
  });

  it("should initialize with a given path", () => {
    const wordList = ["cat", "cut", "cot", "got", "cog", "log", "dog"];
    const path = ["cat", "cot", "cog", "dog"];
    const game = new WordLadderGame(wordList, path);

    expect(game.fromWord).toBe("cat");
    expect(game.toWord).toBe("dog");
    expect(game.steps).toBe(4);
  });

  it("should return an iterator to its word list", () => {
    const wordList = ["cat", "cut", "cot", "got", "cog", "log", "dog"];
    const game = new WordLadderGame(wordList, [], 3);

    expect([...game.words()]).toEqual(wordList);
  });

  it("should test if a word is in its word list", () => {
    const wordList = ["cat", "cut", "cot", "got", "cog", "log", "dog"];
    const game = new WordLadderGame(wordList, [], 3);

    expect(game.hasWord("cat")).toBe(true);
    expect(game.hasWord("foo")).toBe(false);
  });

  it("should start a new game with a random path", () => {
    const wordList = [
      "cat",
      "hat",
      "cut",
      "hut",
      "cot",
      "hot",
      "got",
      "lot",
      "cog",
      "hog",
      "log",
      "fog",
      "dog",
    ];
    const game = new WordLadderGame(wordList, [], 3);

    expect(game.fromWord).toBe("");
    expect(game.toWord).toBe("");
    expect(game.steps).toBe(0);

    game.startGame(4);

    expect(game.fromWord).toBeOneOf(wordList);
    expect(game.toWord).toBeOneOf(wordList);
    expect(game.steps).toBe(4);
  });
});
