import { useState } from 'react';
import { deleteGame } from '../api/GamesApi';
import './Game.css';

const Game = ({game, onDeleteGame}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const plataformas = game.plataformas.join(' - ');
    const descripcion100 = game.descripcion.substring(0,100);

    const delGame = async () => {
        const response = await deleteGame(game);
        if (!response.error) {
            onDeleteGame(game);
        }
    }

    return <div className="GameContainer" onClick={openModal}>
            <h1 className="GameTitle">{game.nombre}</h1>
            <p className="GamePlatforms">Plataformas: {plataformas}</p>
            <img className="GameImage" src={game.imagen} alt={game.nombre}/>
            <p className="GamePrice">Precio: {game.precio}€</p>
            <p className="GameDescription">Descripción: {descripcion100}...</p>

            <button onClick={delGame}>Borrar juego</button>

            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{game.nombre}</h2>
                        <p>Descripción: {game.descripcion}</p>
                        <p>Fecha de Lanzamiento: {game.fecha_lanza}</p>
                        <p>Compañía: {game.compania}</p>
                        <p>Plataformas: {game.plataformas.join(' - ')}</p>
                        <p>Categorías: {game.categorias.join(' - ')}</p> 
                        <p>Precio: ${game.precio}</p>
                        <img src={game.imagen} alt={game.nombre} /><br></br>
                        <a href={game.video} target="_blank" rel="noopener noreferrer">Ver Video</a><br></br>
                        <button className="close" onClick={closeModal}>&times;</button>
                    </div>
                </div>
            )}
        </div>
}

export default Game;