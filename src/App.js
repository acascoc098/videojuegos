import { useContext, useState } from 'react';
import './App.css';
import GameList from './components/GameList';
import { NavLink, Route, Routes } from 'react-router-dom';
import GameDetalle from './components/GameDetalle';
import { GameContext } from './context/GameProvider';
import AltaForm from './components/AltaForm';

function App() {
  //const [games,setGames] = useState([]);

  const {games,setGames} = useContext(GameContext)

  const onDeleteGame = (delGame) => {
    const newGames = games.filter((game) => delGame !== game);
    setGames(newGames);
  }

  return (
    <div className="App">
      {
      /*<nav>
        <NavLink to="/home">LISTADO</NavLink>
        <NavLink to="/new">AÑADIR</NavLink>
        <NavLink></NavLink>
      </nav>
      <Routes>
        <Route path='/game/:gameid' element={<GameDetalle/>}/>
        <Route path='/home' element={<GameList onDeleteGame={onDeleteGame}/>}/>
      </Routes>*/
      }
      <AltaForm/>
    </div>
  );
}

export default App;
