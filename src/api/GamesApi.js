
export const getGames = async () => {
    const response = await fetch("http://localhost:3001/juegos");
    return await response.json();
}

export const deleteGame = async (game) => {
    const response = await fetch("http://localhost:3001/juegos/" + game.id, {
        method: "DELETE"
    });
    
    if (response.status === 200) {
        console.log("Sip");
        return {error: false};
    } else {
        console.log("Nop");
        return {error: true, data: "No se ha podido borrar el juego"};
    }
}