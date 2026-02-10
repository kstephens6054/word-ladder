import "./App.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <p>The Playfield component goes here.</p>
      </div>
      <footer className="footer">
        <p>The Footer component goes here.</p>
      </footer>
    </div>
  );
}

export default App;
