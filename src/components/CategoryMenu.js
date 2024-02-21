import React, { useState, useEffect } from 'react';

const CategoryMenu = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/categorias');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (categoryId, checked) => {
    onCategoryChange(categoryId, checked);
  };

  return (
    <div>
      <h3>Categorías</h3>
      {categories.map(category => (
        <label key={category.id}>
          <input
            type="checkbox"
            value={category.id}
            onChange={(e) => handleCategoryChange(e.target.value, e.target.checked)}
          />
          {category.title}
        </label>
      ))}
    </div>
  );
};

export default CategoryMenu;