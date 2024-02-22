import {createContext, useEffect, useState} from "react";

export const GameContext = createContext();

const GameProvider = ({children}) => {
    const [games, setGames] = useState([]);

    const getGames = async () => {
        try{
            const response = await fetch("http://localhost:3001/juegos");
            if (response.status !== 200) throw Error;
            const gamesData = await response.json();
            return setGames(gamesData);
            
        }catch (e){
            console.log("ERROR: no se pueden recuperar los libros")
        }
        //return await response.json();
    }

    useEffect(() => {
        getGames();
    },[])

    return (
        <GameContext.Provider value={{games,setGames,getGames}}>
            {children}
        </GameContext.Provider>
    );
}

export default GameProvider;