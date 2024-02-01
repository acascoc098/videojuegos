
export const getGames = async () => {
    const response = await fetch("http://localhost:3001/juegos");
    return await response.json();
}