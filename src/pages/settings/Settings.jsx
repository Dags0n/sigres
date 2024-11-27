import React, { useState } from "react";
import "./Settings.css";
import { Typography } from "@mui/material";
import CaraTranquilo from '../../assets/cara-tranquilo.png';

const Settings = () => {
    const [showNotification, setShowNotification] = useState(false);

    const handleConfirm = (e) => {
        e.preventDefault();
        setShowNotification(true);

        document.getElementById("configuracoes-button").style.backgroundColor = "#106212";

        // Ocultar a notificação automaticamente após 3 segundos
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
        setTimeout(() => {
            document.getElementById("configuracoes-button").style.backgroundColor = "#4caf50";
        }, 1000);
    };

    return (
        <div className="configuracoes-container">
            <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "0 0 20px 0", justifySelf: 'flex-start' }}>
                Configurações
            </Typography>
            <div className="configuracoes-box">
                <div className="flexx">
                    <div className="configuracoes-row">
                        <label>Nome do Estabelecimento</label>
                        <input type="text" defaultValue="Exemplo's Bar" className="configuracoes-input" />
                    </div>
                    <div className="configuracoes-row">
                        <label>Fuso Horário</label>
                        <select defaultValue="Brasília, DF (GMT-3)" className="configuracoes-input">
                            <option>Brasília, DF (GMT-3)</option>
                            <option>São Paulo, SP (GMT-3)</option>
                            <option>Nova York, NY (GMT-5)</option>
                        </select>
                    </div>
                    <div className="configuracoes-row">
                        <label>Senha de acesso ao SIGRes</label>
                        <input type="password" defaultValue="******" className="configuracoes-input" />
                    </div>
                    <div className="configuracoes-row">
                        <label>Número de Mesas</label>
                        <input type="number" defaultValue="200" className="configuracoes-input" />
                    </div>
                    <div className="form-group avatar-section">
                        <img
                            src={CaraTranquilo}
                            alt="Avatar"
                            className="avatar-icon"
                        />
                        <button type="button" className="alterar-icone-button">
                            Alterar Ícone
                        </button>
                    </div>
                    <div className="configuracoes-row">
                        <label>Usar senha para entrar no SIGRes</label>
                        <input type="checkbox" className="configuracoes-checkbox" />
                    </div>
                    <div className="configuracoes-row">
                        <label>Bate-papo ativo</label>
                        <input type="checkbox" className="configuracoes-checkbox" />
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
