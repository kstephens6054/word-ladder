// vitest environment node

import { describe, it, expect, beforeEach } from "vitest";
import WordGraph from ".";

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

  it("should create a graph from entries", () => {
    const entries: [string, string[]][] = [
      ["cat", ["cot", "cut"]],
      ["cot", ["cat", "cut"]],
      ["cut", ["cat", "cot"]],
    ];
    const graphFromEntries = WordGraph.fromEntries(entries);
    expect(graphFromEntries.getNeighbors("cat")).toEqual(["cot", "cut"]);
    expect(graphFromEntries.getNeighbors("cot")).toEqual(["cat", "cut"]);
    expect(graphFromEntries.getNeighbors("cut")).toEqual(["cat", "cot"]);
  });

  it("should find paths correctly", () => {
    const initialWords = ["cat", "cot", "cut", "bat", "bot", "but"];
    const graphWithWords = new WordGraph(initialWords);

    const pathsFromCat = graphWithWords.findAllPaths("cat");
    expect(pathsFromCat).toContainEqual(["cat", "cot"]);
    expect(pathsFromCat).toContainEqual(["cat", "bat"]);
    expect(pathsFromCat).toContainEqual(["cat", "cot", "bot"]);
    expect(pathsFromCat).toContainEqual(["cat", "cot", "cut"]);
  });

  it("should respect maxDepth in findAllPaths", () => {
    const initialWords = ["cat", "cot", "cut", "bat", "bot", "but"];
    const graphWithWords = new WordGraph(initialWords);

    const pathsFromCatMax2 = graphWithWords.findAllPaths("cat", 2);
    for (const ladder of pathsFromCatMax2) {
      expect(ladder.length).toBeLessThanOrEqual(2);
    }
  });

  it("should test if a word is in the word list", () => {
    const initialWords = ["cat", "cot", "cut", "bat", "bot", "but"];
    const graphWithWords = new WordGraph(initialWords);

    expect(graphWithWords.hasWord("cat")).toBe(true);
    expect(graphWithWords.hasWord("dog")).toBe(false);
  });

  it("should test if two words are neighbors", () => {
    expect(WordGraph.areNeighbors("cat", "cot")).toBe(true);
    expect(WordGraph.areNeighbors("cat", "bot")).toBe(false);
    expect(WordGraph.areNeighbors("cat", "dog")).toBe(false);
  });

  it("should return all paths with the specified length", () => {
    const initialWords = ["cat", "cot", "cut", "bat", "bot", "but"];
    const graphWithWords = new WordGraph(initialWords);
    const pathsFromCat = graphWithWords.findAllPathsByLength("cat", 3);

    for (const path of pathsFromCat) {
      expect(path.length).toBe(3);
    }
  });

  it("should return an iterator to the word list", () => {
    const initialWords = ["cat", "cot", "cut"];
    const graphWithWords = new WordGraph(initialWords);

    expect(graphWithWords).toHaveProperty("words");
    expect([...graphWithWords.words()]).toEqual(initialWords);
  });

  it("should return the length of the word list", () => {
    const initialWords = ["cat", "cot", "cut"];
    const graphWithWords = new WordGraph(initialWords);

    expect(graphWithWords).toHaveProperty("size");
    expect(graphWithWords.size).toBe(3);
  });

  it("should find a random path of given length", () => {
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
    const graphWithWords = new WordGraph(wordList);
    let path = graphWithWords.findRandomPath("hat", 4);

    expect(path.length).toBe(4);

    const paths = new Set<string>();
    for (let i = 1; i <= 10; i++) {
      path = graphWithWords.findRandomPath("hat", 4);
      paths.add(path.join("|"));
    }

    expect(paths.size).toBeGreaterThan(1);
  });
});
