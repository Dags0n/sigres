import React from 'react';
import ItemCounterBox from '../components/item-counter-box/ItemCounterBox';
import LineChart from '../components/line-chart/LineChart';

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
const yAxis = 'Vendas Realizadas';
const data = [100, 20, 150, 25, 300, 35, 20];

export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px'}}>
        <ItemCounterBox items={items} />
        <LineChart xAxis={xAxis} yAxis={yAxis} data={data} />
      </div>
    </>
  );
}
