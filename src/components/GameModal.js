import './Game.css';
import React from "react";
import './GameModal.css';

const GameModal = ({ game, isOpen, onClose}) => {
  
  if (!isOpen) {
    console.log("modal cerrado")
    return null;
  }

  console.log(isOpen);
  return (
    <div className='modal' onClick={(e) => {e.stopPropagation()}}>
          <div className="modal-content">
            <button className="close" onClick={onClose}>&times;</button>
            <h2>{game.nombre}</h2>
            <p>Descripción: {game.descripcion}</p>
            <p>Fecha de Lanzamiento: {game.fecha_lanza}</p>
            <p>Compañía: {game.compania}</p>
            <p>Plataformas: {game.plataformas.join(', ')}</p>
            <p>Categorías: {game.categorias.join(', ')}</p>
            <p>Precio: ${game.precio}</p>
            <img src={game.imagen} alt={game.nombre} />
            <a href={game.video} target="_blank" rel="noopener noreferrer">Ver Video</a>
          </div>
    </div>
  );
};

export default GameModal;
