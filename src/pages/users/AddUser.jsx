import React from 'react';
import './AddUser.css'; // Arquivo CSS para estilização
import { NavLink } from 'react-router-dom';

const AddUser = () => {
    return (
        <div className="cadastro-usuario-container">
            <main className="main-content">
                <section className="content">
                    <form className="form-cadastro-usuario">
                        <div className="form-group">
                            <label>Nome do Usuário</label>
                            <input type="text" placeholder="Digite o nome do usuário" />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" placeholder="Digite a senha" />
                        </div>
                        <div className="form-group">
                            <label>Administrador</label>
                            <input type="checkbox" />
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
                            <NavLink
                                key='Usuários'
                                to='/users'
                                disablePadding
                            >
                                <button type="submit" className="confirm-button">
                                    Confirmar
                                </button>
                            </NavLink>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default AddUser;
