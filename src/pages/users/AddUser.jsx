import React, { useState } from 'react';
import './AddUser.css'; // Arquivo CSS para estilização
import { NavLink, useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Criação do objeto com os dados do novo usuário
        const newUser = {
            username: username,
            password: password,
            roles: isAdmin ? ['ROLE_ADMIN', 'ROLE_USER'] : ['ROLE_USER'], // Atribui o papel de administrador ou usuário comum
            userId: null
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                setShowNotification(true);
                setUsername('');
                setPassword('');
                setIsAdmin(false);
                setTimeout(() => {
                    setShowNotification(false);
                    navigate('/users'); // Redireciona para a lista de usuários
                }, 3000);
            } else {
                alert('Erro ao cadastrar usuário');
            }
        } catch (error) {
            console.error('Erro ao adicionar usuário', error);
            alert('Erro ao adicionar usuário');
        }
    };

    return (
        <div className="cadastro-usuario-container">
            <main className="main-content">
                <section className="content">
                    <form className="form-cadastro-usuario" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nome do Usuário</label>
                            <input
                                type="text"
                                placeholder="Digite o nome do usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input
                                type="password"
                                placeholder="Digite a senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Administrador</label>
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        </div>
                        <div className="form-actions">
                            <NavLink key="Usuários" to="/users" disablePadding>
                                <button type="button" className="cancel-button">
                                    Cancelar
                                </button>
                            </NavLink>
                            <button
                                type="submit"
                                className="confirm-button"
                            >
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
