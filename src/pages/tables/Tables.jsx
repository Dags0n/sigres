import React, { useState } from 'react';
import './Tables.css'; // Arquivo CSS para estilização

const Tables = () => {
    const [filter, setFilter] = useState('all'); // Estado para o filtro de mesas
    const [tables, setTables] = useState(
        [
            { id: 1, number: '1', status: 'occupied' },
            { id: 2, number: '2', status: 'available' },
            { id: 3, number: '3', status: 'available' },
            { id: 4, number: '4', status: 'occupied' },
            ...Array.from({ length: 200 }, (_, i) => ({
                id: i + 5,
                number: (i + 5).toString(),
                status: i % 2 === 0 ? 'available' : 'occupied',
            })),
        ]
    );

    const filteredTables =
        filter === 'all' ? tables : tables.filter((table) => table.status === filter);

    const trocar = (id) => {
        setTables((prevTables) =>
            prevTables.map((table) =>
                table.id === id
                    ? { ...table, status: table.status === 'available' ? 'occupied' : 'available' }
                    : table
            )
        );
    };

    return (
        <div className="table-list-container">
            <header className="table-list-header">
                <h1>Mesas</h1>
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
                {filteredTables.map((table) => (
                    <button
                        key={table.id}
                        className={`table-button ${table.status === 'available' ? 'available' : 'occupied'}`}
                        onClick={() => trocar(table.id)}
                    >
                        {table.number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tables;
