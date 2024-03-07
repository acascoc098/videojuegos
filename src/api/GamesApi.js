export const getGame = async (gameid) => {
    try {
        const response = await fetch(`http://localhost:3001/juegos/${gameid}`);
        if (response.status === 200) {
            return {error: false, data: await response.json()};
        } else {
            return {error: true, data: "No existe el id del juego"};
        }
    } catch(e) {
        return {error: true, data: "No se ha podido descargar el juego"}
    }
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

export const postGame = async (game) => {
    try {
        const response = await fetch("http://localhost:3001/juegos/", {
           method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(game)
        });
        if (response.status === 201) {
            return {error: false, data: await response.json()}
        }
        return {error: true, data: "No se ha podido guardar el juego"};
    } catch(e) {
        return {error: true, data: "No hay conectividad con el servidor."}
    }
    
}

export const getCategorias = async () => {
    try {
        const response = await fetch("http://localhost:3001/categorias");
        return {error: false, data: await response.json()};
    } catch(e) {
        return {error: true, data: "No se ha podido cargar las categorias"}
    }
}

export const getPlataformas = async () => {
    try {
        const response = await fetch("http://localhost:3001/plataformas");
        return {error: false, data: await response.json()};
    } catch(e) {
        return {error: true, data: "No se ha podido cargar las plataformas"}
    }
}
