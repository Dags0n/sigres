import React, { useEffect, useState } from 'react';
import './InfoUser.css';
import { NavLink, useNavigate } from 'react-router-dom';

const InfoUser = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Função para buscar os dados do usuário
    useEffect(() => {
        const userId = localStorage.getItem('user-info'); // Pega o id do usuário do localStorage
        if (userId) {
            const fetchUser = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`http://localhost:8080/user/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data); // Armazena os dados do usuário
                    } else {
                        console.error('Erro ao carregar dados do usuário');
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados do usuário', error);
                }
            };

            fetchUser();
        } else {
            console.error('ID do usuário não encontrado no localStorage');
        }
    }, []);

    // Função para excluir o usuário
    const handleDelete = async () => {
        if (user) {
            const loggedUserId = localStorage.getItem('user-id'); // ID do usuário logado
            if (user.id === parseInt(loggedUserId)) {
                alert('Você não pode excluir seu próprio usuário!');
                return;
            }

            const confirmDelete = window.confirm('Tem certeza que deseja excluir este usuário?');
            if (confirmDelete) {
                const token = localStorage.getItem('token');
                try {
                    const response = await fetch(`http://localhost:8080/user/${user.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });

                    if (response.ok) {
                        alert('Usuário excluído com sucesso!');
                        navigate('/users'); // Redireciona para a lista de usuários
                    } else if (response.status === 403) {
                        alert('Você não pode excluir o próprio usuário!');
                    } else {
                        alert('Erro ao excluir usuário');
                    }
                } catch (error) {
                    console.error('Erro ao excluir usuário', error);
                    alert('Erro ao excluir usuário');
                }
            }
        }
    };

    // Se os dados do usuário ainda não foram carregados, exibe um carregando
    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="cadastro-usuario-container">
            <main className="main-content">
                <section className="content">
                    <form className="form-cadastro-usuario">
                        <div className="form-group">
                            <label>Nome do Usuário</label>
                            <input type="text" value={user.username} disabled />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" value={"***********"} disabled />
                        </div>
                        <div className="form-group">
                            <label>Administrador</label>
                            <input type="checkbox" checked={user.roles.some(role => role.name === 'ROLE_ADMIN')} disabled />
                        </div>
                        <div className="form-actions" style={{ marginBottom: '10px' }}>
                            <button type="button" className="delete-button" onClick={handleDelete}>
                                Excluir Usuário
                            </button>
                        </div>
                        <div className="form-actions">
                            <NavLink key="Usuários" to="/users" disablePadding>
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
