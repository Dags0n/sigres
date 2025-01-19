import React, { useEffect, useState } from 'react';
import UserBox from '../../components/user-box/UserBox';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './AddUser.css';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Função para obter os usuários
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtenha o token JWT do localStorage
        const response = await fetch('http://localhost:8080/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Adiciona o token ao cabeçalho
            'Content-Type': 'application/json',
          }
        });

        // Verifica se a resposta foi bem-sucedida e extrai os dados corretamente
        if (response.ok) {
          const data = await response.json();  // Extrai os dados do corpo da resposta
          setUsers(data);  // Atualiza o estado com os dados recebidos
        } else {
          console.error('Erro na resposta da API:', response.statusText);
        }
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    };

    fetchUsers(); // Chama a função para buscar os usuários
  }, []);

  return (
    <><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', padding: '20px' }}>
      <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "0 0 10px 0", justifySelf: 'flex-start' }}>
        Usuários
      </Typography>
      <NavLink
        key='Adicionar Usuário'
        to='/users/add'
        disablePadding
      >
        <button type="submit" className="confirm-button">
          Novo Usuário
        </button>
      </NavLink>
    </div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', padding: '20px' }}>
        <UserBox users={users} />
      </div></>
  );
}
