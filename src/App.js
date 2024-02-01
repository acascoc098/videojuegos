import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import GameList from './components/GameList';

function App() {
  const [games,setGames] = useState([]);

  return (
    <div className="App">
      <GameList games={games} setGames={setGames}/>  
    </div>
  );
}

export default App;
