import { useContext, useEffect, useState } from "react";
import Game from "./Game";
import { GameContext } from "../context/GameProvider";
import CategoryMenu from "./CategoryMenu";
import PlatformMenu from "./PlatformMenu";
import GameModal from "./GameModal";

function GameList ({onDeleteGame}){

    const {getGames,games,setGames} = useContext(GameContext)
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

    const handleCategoryChange = (categoriaId, checked) => {
        
    };
    
    // Función para filtrar juegos por plataforma
    const handlePlatformChange = (plataformaId, checked) => {
        
    };
      

    return (
        <div className="Lista">
            <CategoryMenu onCategoryChange={handleCategoryChange} />
            <PlatformMenu onPlatformChange={handlePlatformChange} />
            {games && games.length > 0 ? (
                games.map(game => (
                <div key={game.id}>
                    <Game game={game} onDeleteGame={onDeleteGame} />
                </div>
                ))
            ) : (
                <p>No se han encontrado juegos</p>
            )}
        </div>
    );
    
}

export default GameList;