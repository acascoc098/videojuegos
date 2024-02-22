import { useContext, useEffect, useState } from "react";
import Game from "./Game";
import './GameList.css'
import { GameContext } from "../context/GameProvider";
import CategoryMenu from "./CategoryMenu";
import PlatformMenu from "./PlatformMenu";

function GameList ({games,setGames,onDeleteGame}){

    const {getGames} = useContext(GameContext)
    const [serverError, setServerError] = useState({error: false, message: ""});

    const downloadGames = async () => {
        try {
            const gamesD = await getGames();
            setGames(gamesD);
            setServerError({ error: false, message: "" });
        } catch (error) {
            setGames([]);
            setServerError({ error: true, message: error.message });
        }
    }
    

    useEffect(() => {
        downloadGames();
    }, []);

    const handleCategoryChange = (categoriaId, checked) => {
        
    };
    
    const handlePlatformChange = (plataformaId, checked) => {
        
    };
      

    
    return (
        <div className="Lista">
            <br></br>
            <div className="container">
                <CategoryMenu onCategoryChange={handleCategoryChange} />
                <PlatformMenu onPlatformChange={handlePlatformChange} />
            </div>
            <br></br>
            {games.length !== 0 ? (
                games.map(game => (
                <div key={game.id}>
                    <Game game={game} key={game.id} onDeleteGame={onDeleteGame} />
                </div>
                ))
            ) : (
                <p>No se han encontrado juegos</p>
            )}
        </div>
    );
    
}

export default GameList;