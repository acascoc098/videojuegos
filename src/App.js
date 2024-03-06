import { useState, useEffect } from 'react';
import './App.css';
import GameList from './components/GameList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameDetalle from './components/GameDetalle';
import PrivateRoute from './components/PrivateRoute';
import AltaForm from './components/AltaForm';
import { getCategorias, getPlataformas } from './api/GamesApi';
import Info from './components/Info';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';

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
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registro' element={<Register/>}/>
        <Route path='' exact element={<PrivateRoute><Home/></PrivateRoute>}>
          <Route index path='/juegos' element={<PrivateRoute><GameList games={games} setGames={setGames} onDeleteGame={onDeleteGame}/></PrivateRoute>}/>
          <Route path='/nuevo' element={<PrivateRoute><AltaForm plataformas={plataformas} categorias={categorias} onSaveGame={onSaveGame}/></PrivateRoute>}/>
          <Route path='/about' element={<PrivateRoute><Info/></PrivateRoute>}/>
          <Route path='/game/:gameid' element={<PrivateRoute><GameDetalle/></PrivateRoute>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
