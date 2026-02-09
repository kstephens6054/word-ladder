// vitest environment node

import { describe, it, expect, beforeEach } from "vitest";
import WordGraph from "../../WordGraph";

describe("WordGraph", () => {
  let graph: WordGraph;

  beforeEach(() => {
    graph = new WordGraph();
  });

  it("should add words and find neighbors correctly", () => {
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

  it("should return undefined for non-existent word", () => {
    expect(graph.getNeighbors("nonexistent")).toBeUndefined();
  });

  it("should handle adding the same word multiple times", () => {
    graph.addWord("cat");
    graph.addWord("cat");
    expect(graph.getNeighbors("cat")).toEqual([]);
  });

  it("should handle words of different lengths", () => {
    graph.addWord("cat");
    graph.addWord("cats");
    expect(graph.getNeighbors("cat")).toEqual([]);
    expect(graph.getNeighbors("cats")).toEqual([]);
  });

  it("should handle an empty graph", () => {
    expect(graph.getNeighbors("anyword")).toBeUndefined();
  });

  it("should accept an initial list of words", () => {
    const initialWords = ["cat", "cot", "cut"];
    const graphWithWords = new WordGraph(initialWords);
    expect(graphWithWords.getNeighbors("cat")).toEqual(["cot", "cut"]);
    expect(graphWithWords.getNeighbors("cot")).toEqual(["cat", "cut"]);
    expect(graphWithWords.getNeighbors("cut")).toEqual(["cat", "cot"]);
  });
});