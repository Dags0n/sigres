import React, { useState, useEffect } from "react";
import "./Settings.css";
import { Typography } from "@mui/material";

const Settings = () => {
    const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
    const [numMesas, setNumMesas] = useState(200);
    const [batePapoAtivo, setBatePapoAtivo] = useState(false);
    const [fusoHorario, setFusoHorario] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    // Função para obter o token do localStorage
    const getToken = () => {
        return localStorage.getItem('token');
    };

    // Função para carregar as configurações atuais do sistema
    useEffect(() => {
        const fetchConfig = async () => {
            const token = getToken();

            try {
                const response = await fetch('http://localhost:8080/config', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const config = await response.json();
                    setNomeEstabelecimento(config.nomeEstabelecimento);
                    setNumMesas(config.numMesas);
                    setBatePapoAtivo(config.batePapoAtivo);
                } else {
                    console.error('Erro ao carregar as configurações');
                }
            } catch (error) {
                console.error('Erro de conexão:', error);
            }
        };

        // Capturar o fuso horário do navegador
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setFusoHorario(userTimezone);

        fetchConfig();
    }, []);

    // Função para salvar as configurações
    const handleConfirm = async (e) => {
        e.preventDefault();

        const updatedConfig = {
            nomeEstabelecimento,
            numMesas: parseInt(numMesas, 10),
            batePapoAtivo,
        };

        const token = getToken();

        try {
            const response = await fetch('http://localhost:8080/config', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedConfig),
            });

            if (response.ok) {
                setShowNotification(true);
                document.getElementById("configuracoes-button").style.backgroundColor = "#106212";

                // Ocultar a notificação automaticamente após 3 segundos
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
                setTimeout(() => {
                    document.getElementById("configuracoes-button").style.backgroundColor = "#4caf50";
                }, 1000);
            } else {
                console.error('Erro ao salvar as configurações');
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    // Função para tratar mudanças no campo de número de mesas
    const handleNumMesasChange = (e) => {
        const value = parseInt(e.target.value, 10);

        // Garantir que o valor esteja entre 0 e 1000
        if (value >= 0 && value <= 1000) {
            setNumMesas(value);
        }
    };

    return (
        <div className="configuracoes-container">
            <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "0 0 20px 0", justifySelf: 'flex-start' }}>
                Configurações
            </Typography>
            <div className="configuracoes-box">
                <div className="flexx">
                    <div className="configuracoes-row">
                        <label>Nome do Estabelecimento:</label>
                        <input
                            type="text"
                            value={nomeEstabelecimento}
                            onChange={(e) => setNomeEstabelecimento(e.target.value)}
                            className="configuracoes-input"
                        />
                    </div>
                    <div className="configuracoes-row">
                        <label>Fuso Horário do Sistema:</label>
                        <select className="configuracoes-input" disabled>
                            <option>{fusoHorario || "Carregando..."}</option>
                        </select>
                    </div>
                    <div className="configuracoes-row">
                        <label>Número de Mesas: (0 a 1000)</label>
                        <input
                            type="number"
                            value={numMesas}
                            min="0"
                            max="1000"
                            onChange={handleNumMesasChange}
                            className="configuracoes-input"
                        />
                    </div>
                    <div className="configuracoes-row">
                        <label>Bate-papo</label>
                        <input
                            type="checkbox"
                            checked={batePapoAtivo}
                            onChange={(e) => setBatePapoAtivo(e.target.checked)}
                            className="configuracoes-checkbox"
                        />
                    </div>
                </div>
                <button id="configuracoes-button" className="configuracoes-button" onClick={handleConfirm}>Salvar Alterações</button>
            </div>
            {/* Notificação */}
            {showNotification && (
                <div className="notification">
                    Alterações cadastradas com sucesso! 🎉
                </div>
            )}
        </div>
    );
};

export default Settings;
