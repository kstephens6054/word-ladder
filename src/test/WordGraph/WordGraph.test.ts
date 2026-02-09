// vitest environment node

import { describe, test, expect, beforeEach } from "vitest";
import WordGraph from "../../WordGraph";

describe("WordGraph", () => {
  let graph: WordGraph;

  beforeEach(() => {
    graph = new WordGraph();
  });

  test("should add words and find neighbors correctly", () => {
    graph.addWord("cat");
    graph.addWord("cot");
    graph.addWord("cut");
    graph.addWord("bat");
    graph.addWord("dog");

    expect(graph.getNeighbors("cat")).toEqual(["cot", "cut", "bat"]);
    expect(graph.getNeighbors("cot")).toEqual(["cat", "cut"]);
    expect(graph.getNeighbors("cut")).toEqual(["cat", "cot"]);
    expect(graph.getNeighbors("bat")).toEqual(["cat"]);
    expect(graph.getNeighbors("dog")).toEqual([]);
  });

  test("should return undefined for non-existent word", () => {
    expect(graph.getNeighbors("nonexistent")).toBeUndefined();
  });
});