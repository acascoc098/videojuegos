import './Info.css'

const Info = () => {

    return(
        <div className="info">
            <h1><span class="icon">👾</span> PROYECTO SOBRE VIDEOJUEGOS <span class="icon">👾</span></h1>
            <p><span class="icon">👤</span> Autora: <strong>Andrea Castilla Cocera</strong></p>
            <p><span class="icon">📖</span> Módulo: <strong>Desarrollo de interfaces</strong></p>
            <p><span class="icon">👨‍💻</span> Grado: <strong>Grado Superior de Desarrollo de Aplicaciones Multiplataforma</strong></p>
            <p>Esta plicación se trata de una página react sobre videojuegos, donde puedes ver un listado, 
                un detalle de cada juego según su id al clickar en su título y se puede añadir un juego.
                <br></br>Añadiendo un logeo y un registro para usuarios, si no estás logeado <span class="icon">❌</span><b>NO ENTRAS</b><span class="icon">❌</span>
            </p>
        </div>
    );
}

export default Info;