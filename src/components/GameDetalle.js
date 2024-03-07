import { useEffect, useState } from "react";
import { getGame } from "../api/GamesApi";
import { useParams } from "react-router-dom";

const GameDetalle = () =>{
    const [game, setGame] = useState({});
    const {gameid} = useParams();

    //No sé por qué me da error con el join
    /*const plataformas = game.plataformas.join(' - ');
    const categorias = game.categorias.join(' - ');*/

    console.log(gameid)
    const downloadGame = async (gameid) => {
        const response = await getGame(gameid);
        if (!response.error) {
            setGame(response.data);
        }
    }

    useEffect(() => {
        downloadGame(gameid);
    },[gameid])

    return(
        <div>
            <h2>{game.nombre}</h2>
                        <p>Descripción: {game.descripcion}</p>
                        <p>Fecha de Lanzamiento: {game.fecha_lanza}</p>
                        <p>Compañía: {game.compania}</p>
                        <p>Plataformas: {game.plataformas}</p>
                        <p>Categorías: {game.categorias}</p>
                        {/*<p>Plataformas: {game.plataformas.join(' - ')}</p>
                        <p>Categorías: {game.categorias.join(' - ')}</p> */}
                        <p>Precio: ${game.precio}</p>
                        <img src={game.imagen} alt={game.nombre} /><br></br>
                        <a href={game.video} target="_blank" rel="noopener noreferrer">Ver Video</a><br></br>
        </div>
    )
}

export default GameDetalle;