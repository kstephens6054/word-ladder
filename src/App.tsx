import "./App.css";
import Header from "./components/Header/Header";

function App() {
  const { fromWord, toWord, steps, startGame, newGame, status, error } =
    useContext(WordLadderContext);

  const handleStartgame = () => {
    startGame(4);
  };

  const handleNewGame = () => {
    newGame({ wordList: ["hat", "hot", "hog", "log"] });
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <p>The Playfield component goes here.</p>
        <button onClick={handleStartgame}>Start Game</button>
        <button onClick={handleNewGame}>New Game</button>
        <div>{`status = "${status}"`}</div>
        <div>{`fromWord = "${fromWord}"`}</div>
        <div>{`toWord = "${toWord}"`}</div>
        <div>{`steps = ${steps}`}</div>
        <div>{`error = ${error}`}</div>
      </div>
      <footer className="footer">
        <p>The Footer component goes here.</p>
      </footer>
    </div>
  );
}
import { useContext } from "react";
import { WordLadderContext } from "./providers/WordLadderContext";

export default App;
