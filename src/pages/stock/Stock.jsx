import React, { useState, useEffect } from 'react';
import './Stock.css';
import { Typography } from '@mui/material';

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os produtos e suas variantes da API
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');

      // Fetch para produtos
      const response = await fetch('http://localhost:8080/product', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const productsData = await response.json();

      // Fetch para variantes de cada produto
      const productsWithVariants = await Promise.all(
        productsData.map(async (product) => {
          const variantsResponse = await fetch(`http://localhost:8080/product-variant/by-product/${product.id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const variants = await variantsResponse.json();
          return { ...product, variants };
        })
      );

      setProducts(productsWithVariants);
    } catch (error) {
      console.error('Erro ao buscar produtos e variantes:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Função para incrementar a quantidade de um produto
  const incrementQuantityVariant = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Obtenha o token JWT do localStorage
      await fetch(`http://localhost:8080/product-variant/${id}/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Adiciona o token ao cabeçalho
          'Content-Type': 'application/json',
        }
      });
      // Atualiza o estado local após a modificação no backend
      fetchProducts();
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

  // Função para decrementar a quantidade de um produto
  const decrementQuantityVariant = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Obtenha o token JWT do localStorage
      await fetch(`http://localhost:8080/product-variant/${id}/remove`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Adiciona o token ao cabeçalho
          'Content-Type': 'application/json',
        }
      });
      // Atualiza o estado local após a modificação no backend
      fetchProducts();
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
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 900,
          m: '0 0 20px 0',
          justifySelf: 'flex-start',
        }}
      >
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
            <React.Fragment key={product.id}>
              <tr>
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
              {product.variants.length > 0 && (
                <>
                  {product.variants.map((variant) => (
                    <tr key={variant.id}>
                      <td>
                        {variant.name}
                      </td>
                      <td>
                        <span className={`status-badge ${variant.amount > 0 ? 'in-stock' : 'out-of-stock'}`}>
                          {variant.amount > 0 ? 'Sim' : 'Não'}
                        </span>
                      </td>
                      <td>
                        {variant.amount > 0
                          ? `${variant.amount} unidade${variant.amount > 1 ? 's' : ''}`
                          : 'Sem estoque'}
                      </td>
                      <td>
                        <button
                          className="action-button add-button"
                          onClick={() => incrementQuantityVariant(variant.id)}
                        >
                          +
                        </button>
                      </td>
                      <td>
                        <button
                          className="action-button remove-button"
                          onClick={() => decrementQuantityVariant(variant.id)}
                          disabled={variant.amount <= 0}
                        >
                          -
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
