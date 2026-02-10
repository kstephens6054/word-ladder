import { describe, it, expect } from "vitest";
import useWordLadder from "./useWordLadder";

describe("useWordLadder hook", () => {
  it("should return the current game properties", () => {
    const { game } = useWordLadder([]);
    expect(game).toBeDefined();
    expect(game).toHaveProperty("fromWord");
    expect(game).toHaveProperty("toWord");
    expect(game).toHaveProperty("steps");
  });

  it("should test if the word is in the list", () => {
    const { hasWord } = useWordLadder(["cat", "cot"]);
    expect(hasWord("cat")).toBe(true);
    expect(hasWord("cot")).toBe(true);
    expect(hasWord("foo")).toBe(false);
  });

  it("should return the areNeigbors, function", () => {
    const { areNeighbors } = useWordLadder([]);
    expect(areNeighbors("cat", "cot")).toBe(true);
  });
});
