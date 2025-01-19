import React, { useState, useEffect } from 'react';
import './Stock.css';
import { Typography } from '@mui/material';

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os produtos da API
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtenha o token JWT do localStorage
      const response = await fetch('http://localhost:8080/product', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Adiciona o token ao cabeçalho
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função fetchProducts ao carregar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para incrementar a quantidade de um produto
  const incrementQuantity = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Obtenha o token JWT do localStorage
      await fetch(`http://localhost:8080/product/${id}/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Adiciona o token ao cabeçalho
          'Content-Type': 'application/json',
        }
      });
      // Atualiza o estado local após a modificação no backend
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? { ...product, amount: product.amount + 1 }
            : product
        )
      );
    } catch (error) {
      console.error('Erro ao incrementar o estoque:', error);
    }
  };

  // Função para decrementar a quantidade de um produto
  const decrementQuantity = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Obtenha o token JWT do localStorage
      await fetch(`http://localhost:8080/product/${id}/remove`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Adiciona o token ao cabeçalho
          'Content-Type': 'application/json',
        }
      });
      // Atualiza o estado local após a modificação no backend
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? { ...product, amount: product.amount - 1 }
            : product
        )
      );
    } catch (error) {
      console.error('Erro ao decrementar o estoque:', error);
    }
  };

  // Carrega um carregamento enquanto os produtos estão sendo buscados
  if (loading) {
    return <Typography>Carregando produtos...</Typography>;
  }

  return (
    <div className="inventory-container">
      <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: '0 0 20px 0', justifySelf: 'flex-start' }}>
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                <span className={`status-badge ${product.amount > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {product.amount > 0 ? 'Sim' : 'Não'}
                </span>
              </td>
              <td>
                {product.amount > 0
                  ? `${product.amount} unidade${product.amount > 1 ? 's' : ''}`
                  : 'Sem estoque'}
              </td>
              <td>
                <button
                  className="action-button add-button"
                  onClick={() => incrementQuantity(product.id)}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  className="action-button remove-button"
                  onClick={() => decrementQuantity(product.id)}
                  disabled={product.amount <= 0}
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
