import React from 'react';
import './InfoUser.css'; // Arquivo CSS para estilização
import { NavLink } from 'react-router-dom';

const InfoUser = () => {
    return (
        <div className="cadastro-usuario-container">
            <main className="main-content">
                <section className="content">
                    <form className="form-cadastro-usuario">
                        <div className="form-group">
                            <label>Nome do Usuário</label>
                            <input type="text" value={"Fulano de Tal"} disabled />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" value={"***********"} disabled />
                        </div>
                        <div className="form-group">
                            <label>Administrador</label>
                            <input type="checkbox" checked disabled/>
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
                        <div className="form-actions" style={{marginBottom: '10px'}}>
                            <NavLink
                                key='Usuários'
                                to='/users'
                                disablePadding
                            >
                                <button type="submit" className="delete-button">
                                    Excluir Usuário
                                </button>
                            </NavLink>
                        </div>
                        <div className="form-actions">
                            <NavLink
                                key='Usuários'
                                to='/users'
                                disablePadding
                            >
                                <button type="button" className="cancel-button">
                                    Voltar
                                </button>
                            </NavLink>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default InfoUser;
