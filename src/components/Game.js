import { useState } from 'react';
import { deleteGame } from '../api/GamesApi';
import GameModal from './GameModal';
import './Game.css';
import { Link } from 'react-router-dom';

const Game = ({game, onDeleteGame}) => {
    const [open,setOpen] = useState(false);
 
    const openModal = () => {setOpen(true);};
    const closeModal = () => {setOpen(false);};

    const plataformas = game.plataformas.join(' - ');
    const categorias = game.categorias.join(' - ');
    const descripcion100 = game.descripcion.substring(0,100);

    const delGame = async () => {
        const response = await deleteGame(game);
        if (!response.error) {
            onDeleteGame(game);
        }
    }

    
    console.log(open);//La variable si cambia pero no muestra el modal
    return (
        <div className="GameContainer" onClick={() => openModal()} key={game.id}>
            <h1 className="GameTitle"><Link to={"/juegos/"+game.id}>{game.nombre}</Link></h1>
            <p className="GamePlatforms">Plataformas: {plataformas}</p>
            <p className="GamePlatforms">Categorías: {categorias}</p>
            <img className="GameImage" src={game.imagen} alt={game.nombre}/>
            <p className="GamePrice">Precio: {game.precio}€</p>
            <p className="GameDescription">Descripción: {descripcion100}...</p>

            <button onClick={delGame}>Borrar juego
            <span class="icon">❌</span></button>
            
            <GameModal game={game} isOpen={open} onClose={closeModal}/>
        </div>
    )
}

export default Game;