import { useContext } from 'react';
import './App.css';
import GameList from './components/GameList';
import { GameContext } from './context/GameProvider';

function App() {
  //const [games,setGames] = useState([]);

  const {games,setGames} = useContext(GameContext)

  const onDeleteGame = (delGame) => {
    const newGames = games.filter((game) => delGame !== game);
    setGames(newGames);
  }

  return (
    <div className="App">
      <GameList onDeleteGame={onDeleteGame}/>  
    </div>
  );
}

export default App;
