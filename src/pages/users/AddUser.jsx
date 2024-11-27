import React, { useState } from 'react';
import './AddUser.css'; // Arquivo CSS para estilização
import { NavLink } from 'react-router-dom';

const AddUser = () => {
    const [showNotification, setShowNotification] = useState(false);

    const handleConfirm = (e) => {
        e.preventDefault();
        setShowNotification(true);

        document.getElementById("name").value = "";
        document.getElementById("password").value = "";
        document.getElementById("checkbox").checked = false;

        document.getElementById("confirm-button").style.backgroundColor = "#106212";
        
        // Ocultar a notificação automaticamente após 3 segundos
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
        setTimeout(() => {
            document.getElementById("confirm-button").style.backgroundColor = "#4caf50";
        }, 1000);
    };

    return (
        <div className="cadastro-usuario-container">
            <main className="main-content">
                <section className="content">
                    <form className="form-cadastro-usuario">
                        <div className="form-group">
                            <label>Nome do Usuário</label>
                            <input id="name" type="text" placeholder="Digite o nome do usuário" />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input id="password" type="password" placeholder="Digite a senha" />
                        </div>
                        <div className="form-group">
                            <label>Administrador</label>
                            <input id="checkbox" type="checkbox" />
                        </div>
                        <div className="form-group avatar-section">
                            <img
                                src="https://via.placeholder.com/80"
                                alt="Avatar"
                                className="avatar-icon"
                            />
                            <button type="button" className="alterar-icone-button">
                                Alterar Ícone
                            </button>
                        </div>
                        <div className="form-actions">
                            <NavLink
                                key='Usuários'
                                to='/users'
                                disablePadding
                            >
                                <button type="button" className="cancel-button">
                                    Cancelar
                                </button>
                            </NavLink>
                            <button id="confirm-button" type="submit" className="confirm-button" onClick={handleConfirm}>
                                Confirmar
                            </button>
                        </div>
                    </form>

                    {/* Notificação */}
                    {showNotification && (
                        <div className="notification">
                            Usuário cadastrado com sucesso! 🎉
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AddUser;
