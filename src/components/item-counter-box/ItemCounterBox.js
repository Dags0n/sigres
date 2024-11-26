import React from 'react';
import PropTypes from 'prop-types';
import './ItemCounterBox.css'; // CSS opcional

const ItemCounterBox = ({ items }) => {
  return (
    <div className="item-counter-box">
      <div className="item-container">
        {items.map((item, index) => (
          <div key={index}>
            <div className="item-box">
                <p>{item.count}</p>
            </div>
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

// Define as propriedades esperadas do componente
ItemCounterBox.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

// Exporta o componente
export default ItemCounterBox;
