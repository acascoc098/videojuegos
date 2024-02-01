const Game = ({game}) => {

    const plataformas = game.plataformas.join(' - ');
    const descripcion100 = game.descripcion.substring(0,100);

    return <div>
        <h1>{game.nombre}</h1>
        <p>Plataformas: {plataformas}</p>
        <img src={game.imagen} width={200} height={200}/>
        <p>Precio: {game.precio}</p>
        <p>Descripcion: {descripcion100}...</p>
    </div>
}

export default Game;