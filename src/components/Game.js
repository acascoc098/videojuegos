import { deleteGame } from '../api/GamesApi';
import './Game.css';

const Game = ({game, onDeleteGame}) => {

    const plataformas = game.plataformas.join(' - ');
    const descripcion100 = game.descripcion.substring(0,100);

    const delGame = async ({onDeleteGame}) => {
        const response = await deleteGame(game);
        if (!response.error) {
            onDeleteGame(game);
        }
    }

    return <div className="GameContainer">
            <h1 className="GameTitle">{game.nombre}</h1>
            <p className="GamePlatforms">Plataformas: {plataformas}</p>
            <img className="GameImage" src={game.imagen} alt={game.nombre}/>
            <p className="GamePrice">Precio: {game.precio}€</p>
            <p className="GameDescription">Descripción: {descripcion100}...</p>

            <button onClick={delGame}>Borrar juego</button>
        </div>
}

export default Game;