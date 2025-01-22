import React, { useState } from 'react';

const Sidebar = ({ categories, onSubcategoryClick }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      {/* Categories List */}
      {/* <aside
        style={{
          width: '100%',
          padding: '20px',
          backgroundColor: '#f2f2f2',
          borderRight: '1px solid #ddd',
          position: 'relative',
        }}
      > */}
        {/* <h3>Categories</h3> */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {categories.map((category) => (
            <li
              key={category.name}
              style={{
                marginBottom: '10px',
                cursor: 'pointer',
                // fontWeight: 'bold',
                position: 'relative',
                textAlign: 'left'
              }}
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
            >
              {category.name}

              {/* Subcategories (displayed on hover) */}
              {hoveredCategory === category && category.subcategories && (
                <ul
                  style={{
                    listStyle: 'none',
                    padding: '10px',
                    margin: 0,
                    position: 'absolute',
                    top: 0,
                    left: '100%',
                    backgroundColor: '#ffffff',
                    border: '1px solid #ddd',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {category.subcategories.map((subcategory) => (
                    <li
                      key={subcategory.name}
                      style={{
                        padding: '5px 10px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                      onClick={() => onSubcategoryClick(subcategory.name)}
                    >
                      {subcategory.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      {/* </aside> */}
    </div>
  );
};

export default Sidebar;

