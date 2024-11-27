import React, { useState } from 'react';
import './Stock.css';
import { Typography } from '@mui/material';

const Stock = () => {
  const [products, setProducts] = useState([
    { name: "Heineken Lata", quantity: 5 },
    { name: "Skol Lata", quantity: 10 },
    { name: "Brahma Lata", quantity: 0 },
    { name: "Brahma Garrafa", quantity: 0 },
    { name: "Bokus", quantity: 0 },
    { name: "Pitu Lata", quantity: 0 },
    { name: "Skate", quantity: 5 },
  ]);

  const incrementQuantity = (index) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrementQuantity = (index) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  return (
    <div className="inventory-container">
      <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "0 0 20px 0", justifySelf: 'flex-start' }}>
        Estoque
      </Typography>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Em estoque</th>
            <th>Disponíveis</th>
            <th>Adicionar</th>
            <th>Retirar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>
                <span
                  className={`status-badge ${product.quantity > 0 ? 'in-stock' : 'out-of-stock'
                    }`}
                >
                  {product.quantity > 0 ? 'Sim' : 'Não'}
                </span>
              </td>
              <td>
                {product.quantity > 0
                  ? `${product.quantity} unidade${product.quantity > 1 ? 's' : ''}`
                  : 'Sem estoque'}
              </td>
              <td>
                <button
                  className="action-button add-button"
                  onClick={() => incrementQuantity(index)}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  className="action-button remove-button"
                  onClick={() => decrementQuantity(index)}
                  disabled={product.quantity === 0}
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
