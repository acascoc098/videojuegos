import React, { useState, useEffect } from 'react';

const PlatformMenu = ({ onPlatformChange }) => {
    const [platforms, setPlatforms] = useState([]);

    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/plataformas');
          const data = await response.json();
          setPlatforms(data);
        } catch (error) {
          console.error('Error al obtener las plataformas:', error);
        }
      }; 
  
    useEffect(() => {
  
      fetchData();
    }, []);

    const handlePlatformChange = (platformId, checked) => {
        onPlatformChange(platformId, checked);
      };
  
    return (
      <div>
        <h3>Plataformas</h3>
        {platforms.map(platform => (
          <label key={platform.id}>
            <input
              type="checkbox"
              value={platform.id}
              onChange={(e) => handlePlatformChange(e.target.value, e.target.checked)}
            />
            {platform.id} -
            {platform.title}
          </label>
        ))}
      </div>
    );
  };

  export default PlatformMenu;