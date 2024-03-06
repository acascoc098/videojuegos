import './Info.css'

const Info = () => {

    return(
        <div className="info">
            <h1><span class="icon">👾</span> PROYECTO SOBRE VIDEOJUEGOS <span class="icon">👾</span></h1>
            <p><span class="icon">👤</span> Autora: <strong>Andrea Castilla Cocera</strong></p>
            <p>Esta plicación se trata de una página react sobre videojuegos, donde puedes ver un listado, 
                un detalle de cada juego según su id y se puede añadir un juego.
            </p>
        </div>
    );
}

export default Info;