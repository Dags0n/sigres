import React, { useState } from "react";
import "./Reports.css";
import { Typography } from "@mui/material";

const Reports = () => {
    const [showNotification, setShowNotification] = useState(false);

    const handleConfirm = (e) => {
        e.preventDefault();
        setShowNotification(true);

        // Ocultar a notificação automaticamente após 3 segundos
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    return (
        <div className="relatorios-container">
            <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "0 0 20px 0", justifySelf: 'flex-start' }}>
                Relatórios
            </Typography>

            <div className="relatorios-secao">
                <h2>Estoque</h2>
                <div className="relatorios-botoes">
                    <button onClick={handleConfirm} className="relatorio-botao">
                        📄 Relatório do Mês
                    </button>
                    <button onClick={handleConfirm} className="relatorio-botao">
                        📄 Relatório da Semana
                    </button>
                    <button onClick={handleConfirm} className="relatorio-botao">
                        📄 Relatório de Hoje
                    </button>
                    <button onClick={handleConfirm} className="relatorio-botao">
                        📄 Relatório Personalizado
                    </button>
                </div>
            </div>

            <div className="relatorios-secao">
                <h2>Pedidos</h2>
                <div className="relatorios-botoes">
                    <button onClick={handleConfirm} className="relatorio-botao">
                        📄 Relatório do Mês
                    </button>
                    <button onClick={handleConfirm} className="relatorio-botao">
                        📄 Relatório da Semana
                    </button>
                    <button onClick={handleConfirm} className="relatorio-botao">
                        📄 Relatório de Hoje
                    </button>
                    <button onClick={handleConfirm} className="relatorio-botao">
                        📄 Relatório Personalizado
                    </button>
                </div>
            </div>

            <div className="relatorios-secao">
                <h2>Extrato/Faturamento</h2>
                <div className="relatorios-botoes">
                    <button onClick={handleConfirm} className="relatorio-botao">
                        📄 Relatório do Mês
                    </button>
                    <button onClick={handleConfirm} className="relatorio-botao">
                        📄 Relatório da Semana
                    </button>
                    <button onClick={handleConfirm} className="relatorio-botao">
                        📄 Relatório de Hoje
                    </button>
                    <button onClick={handleConfirm} className="relatorio-botao">
                        📄 Relatório Personalizado
                    </button>
                </div>
            </div>
            {/* Notificação */}
            {showNotification && (
                <div className="notification">
                    Download iniciado com sucesso! 🎉
                </div>
            )}
        </div>
    );
};

export default Reports;
