import React from 'react';
import { Typography } from '@mui/material';
import ItemCounterBox from '../../components/item-counter-box/ItemCounterBox';
import LineChart from '../../components/line-chart/LineChart';

// Dados para o ItemCounterBox
const items = [
  { name: 'Produtos Cadastrados', count: 12 },
  { name: 'Mesas Cadastradas', count: 25 },
  { name: 'Usuários Cadastrados', count: 25 },
  { name: 'Produtos no Estoque', count: 8 },
  { name: 'Pedidos Realizados', count: 1500 },
];

// Dados para o gráfico
const xAxis = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
const yAxis = 'Vendas Realizadas na semana';
const data = [100, 20, 150, 25, 300, 35, 20];

export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', flexWrap: 'wrap', marginTop: '20px' }}>
        <div style={{ width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'start', flexDirection: 'column' }}>
          <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "0 0 10px 0", justifySelf: 'flex-start' }}>
            Dashboard
          </Typography>
          <ItemCounterBox items={items} />
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
