import { useEffect, useState } from "react";
import { getGame } from "../api/GamesApi";
import { useParams } from "react-router-dom";

const GameDetalle = () =>{
    const [game, setGame] = useState({});
    const {gameId} = useParams();

    const downloadGame = async (gameId) => {
        const response = await getGame(gameId);
        if (!response.error) {
            setGame(response.data);
        }
    }

    useEffect(() => {
        downloadGame(gameId);
    },[gameId])

    return(
        <div>
            <h2>{game.nombre}</h2>
                        <p>Descripción: {game.descripcion}</p>
                        <p>Fecha de Lanzamiento: {game.fecha_lanza}</p>
                        <p>Compañía: {game.compania}</p>
                        <p>Plataformas: {game.plataformas.join(' - ')}</p>
                        <p>Categorías: {game.categorias.join(' - ')}</p> 
                        <p>Precio: ${game.precio}</p>
                        <img src={game.imagen} alt={game.nombre} /><br></br>
                        <a href={game.video} target="_blank" rel="noopener noreferrer">Ver Video</a><br></br>
        </div>
    )
}

export default GameDetalle;