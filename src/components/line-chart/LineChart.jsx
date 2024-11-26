import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './LineChart.css'; // CSS opcional

// Registrar os componentes necessários do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineChart({ xAxis, yAxis, data, yPadding = 10 }) {
    // Calcula o maior valor do dataset e adiciona o padding
    const biggestValue = Math.max(...data);
    const maxYValue = biggestValue + (biggestValue * 10)/100;

    const chartData = {
        labels: xAxis, // Valores do eixo X
        datasets: [
            {
                label: yAxis, // Rótulo do eixo Y
                data: data, // Valores do gráfico
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.4, // Suavização da linha
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Permite ajustar o tamanho
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Vendas Realizadas',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: maxYValue,
            },
        },
    };

    return (
        <div class="line-box" style={{ width: '400px', height: '300px', marginLeft: '20px' }}>
            <Line data={chartData} options={options} />
        </div>
    );
}
