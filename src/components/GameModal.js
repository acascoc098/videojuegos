import React, { useState } from 'react';

const GameModal = ({ game }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className='modal'>
      <button onClick={openModal}>i</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={closeModal}>&times;</button>
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
      )}
    </div>
  );
};

export default GameModal;
