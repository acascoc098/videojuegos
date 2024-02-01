import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import GameList from './components/GameList';

function App() {
  const [games,setGames] = useState([]);

  const onDeleteGame = (delGame) => {
    const newGames = games.filter((game) => delGame !== game);
    setGames(newGames);
  }

  return (
    <div className="App">
      <GameList games={games} setGames={setGames} onDeleteGame={onDeleteGame}/>  
    </div>
  );
}

export default App;
