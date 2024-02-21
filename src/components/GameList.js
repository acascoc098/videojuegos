import { useContext, useEffect, useState } from "react";
import Game from "./Game";
import { GameContext } from "../context/GameProvider";

function GameList ({onDeleteGame}){

    const [loading, setLoadirng] = useState(true)
    const {getGames,games,setGames} = useContext(GameContext)
    const [serverError, setServerError] = useState({error: false, message: ""});

    const downloadGames = async () => {
        setLoadirng(true);
        try {
            const gamesD = await getGames();
            setGames(gamesD);
            setServerError({ error: false, message: "" });
            setLoadirng(false);
        } catch (error) {
            setGames([]);
            setLoadirng(false);
            setServerError({ error: true, message: error.message });
        }
    }
    

    /*useEffect(() => {
        downloadGames();
    },[]);*/
    useEffect(() => {
        if (!games || games.length === 0) {
            downloadGames();
        }
    }, [games]);
    

    /*return (
        <div className="Lista">
            {
                games && games.length === 0 ? 
                    <p>No se han encontrado juegos :&lpar;</p>
                : 
                    games.map(game => 
                        <Game game={game} key={game.id} onDeleteGame={onDeleteGame}/>
                    )
            }
        </div>
    );*/
    return (
        <div className="Lista">
            { 
                games && games.length > 0 ? 
                    games.map(game => 
                        <Game game={game} key={game.id} onDeleteGame={onDeleteGame}/>
                    )
                : 
                    <p>No se han encontrado juegos</p>
            }
        </div>
    );
    
}

export default GameList;