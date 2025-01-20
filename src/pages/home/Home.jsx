import React from 'react';
import { Typography } from '@mui/material';
import ItemCounterBox from '../../components/item-counter-box/ItemCounterBox';
import LineChart from '../../components/line-chart/LineChart';

const yAxis = 'Vendas Realizadas na semana';

export default function Home() {
  const [items, setItems] = React.useState({
    products: { name: 'Produtos Cadastrados', count: 0 },
    tables: { name: 'Mesas Cadastradas', count: 0 },
    stock: { name: 'Produtos no Estoque', count: 0 },
    orders: { name: 'Pedidos Realizados', count: 0 },
  });

  const [chartData, setChartData] = React.useState({
    xAxis: [],
    data: [],
  });

  const getWeekDateRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + diffToMonday);
  
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + diffToMonday + 6);
  
    const formatDate = (date) => date.toISOString().split('T')[0] + ' 00:00:00';
    const formatEndDate = (date) => date.toISOString().split('T')[0] + ' 23:59:59';
  
    return {
      initDate: formatDate(startDate),
      finalDate: formatEndDate(endDate),
    };
  };

  React.useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem('token');
        const { initDate, finalDate } = getWeekDateRange();
        const response = await fetch('http://localhost:8080/report/extract', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            initDate: initDate,
            finalDate: finalDate,
          }),
        });
    
        if (response.ok) {
          const data = await response.json();          
          const salesPerDay = [0, 0, 0, 0, 0, 0, 0];
    
          data.forEach(sale => {
            const saleDate = new Date(sale.time.split(' ')[0].split('/').reverse().join('-') + ' ' + sale.time.split(' ')[1]);
            const dayOfWeek = saleDate.getDay();
            salesPerDay[dayOfWeek] += sale.amount;
          });
    
          setChartData({
            xAxis: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
            data: salesPerDay,
          });
        } else {
          console.error('Erro ao buscar vendas');
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição', error);
      }
    };
    fetchSalesData();
  }, []);

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
          <LineChart xAxis={chartData.xAxis} yAxis={yAxis} data={chartData.data} />
        </div>
      </div>
    </>
  );
}
