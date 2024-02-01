import { useEffect } from "react";
import { getGames } from "../api/GamesApi"
import Game from "./Game";

function GameList ({games, setGames, onDeleteGame}){
    const downloadGames = async () => {
        const games = await getGames();
        setGames(games);
    }

    useEffect(() => {
        downloadGames();
    },[]);

    return (
        <div className="Lista">
            {
                games.length === 0 ? 
                    <p>No se han encontrado juegos :&lpar;</p>
                : 
                    games.map(game => 
                        <Game game={game} key={game.id} onDeleteGame={onDeleteGame}/>
                    )
            }
        </div>
    );
}

export default GameList;