import React, { useEffect, useState } from 'react';
import './Tables.css'; // Arquivo CSS para estilização
import { Typography } from '@mui/material';

const Tables = () => {
    const [filter, setFilter] = useState('all'); // Estado para o filtro de mesas
    const [tables, setTables] = useState([]); // Estado para armazenar as mesas
    const [loading, setLoading] = useState(true); // Estado para controle de carregamento

    // Função para buscar as mesas da API
    const fetchTables = async () => {
        try {
            const token = localStorage.getItem('token'); // Obtendo o token JWT do localStorage
            const response = await fetch('http://localhost:8080/desk', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Enviando o token no cabeçalho
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTables(data); // Atualizando o estado com os dados das mesas
            } else {
                console.error('Erro ao buscar mesas');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição', error);
        } finally {
            setLoading(false); // Finaliza o estado de carregamento
        }
    };

    // Filtragem das mesas
    const filteredTables = 
        filter === 'all'
            ? tables
            : tables.filter((table) => (filter === 'available' ? !table.fill : table.fill));

    // Função para trocar o status da mesa
    const toggleTableStatus = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/desk/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Atualiza o estado das mesas com a nova configuração
                setTables((prevTables) =>
                    prevTables.map((table) =>
                        table.id === id
                            ? { ...table, fill: !table.fill } // Alterna o status de preenchimento
                            : table
                    )
                );
            } else {
                console.error('Erro ao alterar status da mesa');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição', error);
        }
    };

    // Carregar as mesas ao montar o componente
    useEffect(() => {
        fetchTables();
    }, []); // O array vazio garante que isso aconteça apenas uma vez ao montar

    return (
        <div className="table-list-container">
            <header className="table-list-header">
                <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "0 0 10px 0", justifySelf: 'flex-start' }}>
                    Mesas
                </Typography>
                <div className="filter-buttons">
                    <button
                        className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        Todas
                    </button>
                    <button
                        className={`filter-button ${filter === 'available' ? 'active' : ''}`}
                        onClick={() => setFilter('available')}
                    >
                        Disponíveis
                    </button>
                    <button
                        className={`filter-button ${filter === 'occupied' ? 'active' : ''}`}
                        onClick={() => setFilter('occupied')}
                    >
                        Ocupadas
                    </button>
                </div>
            </header>
            <div className="table-grid">
                {loading ? (
                    <p>Carregando mesas...</p> // Mensagem de carregamento
                ) : (
                    filteredTables.map((table) => (
                        <button
                            key={table.id}
                            className={`table-button ${table.fill ? 'occupied' : 'available'}`}
                            onClick={() => toggleTableStatus(table.id)}
                        >
                            {table.id}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default Tables;
