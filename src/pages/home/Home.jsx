import React from 'react';
import { Typography } from '@mui/material';
import ItemCounterBox from '../../components/item-counter-box/ItemCounterBox';
import LineChart from '../../components/line-chart/LineChart';

// Dados para o gráfico
const xAxis = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
const yAxis = 'Vendas Realizadas na semana';
const data = [100, 20, 150, 25, 300, 35, 20];

export default function Home() {
  const [items, setItems] = React.useState({
    products: { name: 'Produtos Cadastrados', count: 0 },
    tables: { name: 'Mesas Cadastradas', count: 0 },
    stock: { name: 'Produtos no Estoque', count: 0 },
    orders: { name: 'Pedidos Realizados', count: 0 },
  });

  const updateItemsCount = (itemId, count) => {
    setItems((prevItems) => {
      return {
        ...prevItems,
        [itemId]: {
          ...prevItems[itemId],
          count,
        },
      };
    });
  }

  const fetchData = async (endpoint, itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setItems((prevItems) => ({
          ...prevItems,
          [itemId]: {
            ...prevItems[itemId],
            count: itemId === 'stock' ? data.filter(item => item.amount > 0).length : data.length,
          },
        }));
      } else {
        console.error('Erro ao buscar itens');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição', error);
    }
  };
  
  React.useEffect(() => {
    fetchData('http://localhost:8080/product-variant', 'products');
  }, []);
  
  React.useEffect(() => {
    fetchData('http://localhost:8080/desk', 'tables');
  }, []);
  
  React.useEffect(() => {
    fetchData('http://localhost:8080/order', 'orders');
  }, []);
  
  React.useEffect(() => {
    fetchData('http://localhost:8080/product-variant', 'stock');
  }, []);  

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/product-variant', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          products = data.filter((item) => item.amount > 0);
          setItems(
            updateItemsCount('stock', products.length),
          );
        } else {
          console.error('Erro ao buscar itens');
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição', error);
      }
    }
    fetchItems();
  }, []);

  return (
    <>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', flexWrap: 'wrap' }}>
        <div style={{ width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'start', flexDirection: 'column' }}>
          <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "0 0 10px 0", justifySelf: 'flex-start' }}>
            Dashboard
          </Typography>
          <ItemCounterBox items={Object.values(items)} />
        </div>
        <div style={{ width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'start', flexDirection: 'column' }}>
          <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "35px 0 10px 0" }}>
            Rendimentos
          </Typography>
          <LineChart xAxis={xAxis} yAxis={yAxis} data={data} />
        </div>
      </div>
    </>
  );
}
