import { useState, useEffect } from 'react';
import './App.css';
import GameList from './components/GameList';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import GameDetalle from './components/GameDetalle';
import AltaForm from './components/AltaForm';
import { getCategorias, getPlataformas } from './api/GamesApi';
import Info from './components/Info';

function App() {
  const [games,setGames] = useState([]);

  const [categorias, setCategorias] = useState([]);
  const [plataformas, setPlataformas] = useState([]);

  const downloadCategorias = async () => {
    const response = await getCategorias();
    if (!response.error) {
      setCategorias(response.data);
    }
  }

  const downloadPlataformas = async () => {
    const response = await getPlataformas();
    if (!response.error) {
      setPlataformas(response.data);
    }
  }

  useEffect(() => {
    downloadCategorias();
    downloadPlataformas();
  },[games])

  const onDeleteGame = (delGame) => {
    const newGames = games.filter((game) => delGame !== game);
    setGames(newGames);
  }

  const onSaveGame = (newGame) => {
    setGames([...games,newGame]);
  }

  console.log(games);
  return (
    <BrowserRouter>
        <div className="App">
      
          <nav>
            <NavLink to="/home" className={"nav-link"}>LISTADO</NavLink>
            <NavLink to="/new" className={"nav-link"}>AÑADIR</NavLink>
            <NavLink to="/about" className={"nav-link"}>ABOUT</NavLink>
          </nav>
          <Routes>
            <Route path='/game/:gameid' element={<GameDetalle/>}/>
            <Route path='/home' element={<GameList games={games} setGames={setGames} onDeleteGame={onDeleteGame}/>}/>
            <Route path='/new' element={<AltaForm plataformas={plataformas} categorias={categorias} onSaveGame={onSaveGame}/>}/>
            <Route path='/about' element={<Info/>}/>
          </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
