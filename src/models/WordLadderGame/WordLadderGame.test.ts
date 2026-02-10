import { describe, it, expect } from "vitest";
import { WordLadderGame } from "./WordLadderGame";

describe("WordLadderGame class", () => {
  it("should exist", () => {
    const game = new WordLadderGame();
    expect(game).toBeDefined();
  });
});
