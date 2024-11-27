import React from 'react';
import UserBox from '../../components/user-box/UserBox';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './AddUser.css';

// Dados para o ItemCounterBox
const users = [
  { name: 'Frederico' },
  { name: 'Fred' },
  { name: 'Manoel' },
  { name: 'Marcos' },
  { name: 'Admin' },
  { name: 'Admin' },
  { name: 'Manoel' },
  { name: 'Marcos' },
  { name: 'Admin' },
  { name: 'Admin' },
  { name: 'Manoel' },
  { name: 'Marcos' },
  { name: 'Admin' },
  { name: 'Admin' },
  { name: 'Manoel' },
  { name: 'Marcos' },
  { name: 'Admin' },
  { name: 'Admin' },
  { name: 'Manoel' },
  { name: 'Marcos' },
  { name: 'Admin' },
  { name: 'Admin' },
  { name: 'Admin' },
  { name: 'Admin' },
  { name: 'Admin' },
  { name: 'Admin' },
  { name: 'Admin' },
  { name: 'Admin' },
  { name: 'Admin' },
];

export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', padding: '20px' }}>
        <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "0 0 10px 0", justifySelf: 'flex-start' }}>
          Usuários
        </Typography>
        <NavLink
          key='Adicionar Usuário'
          to='/users/add'
          disablePadding
        >
          <button type="submit" className="confirm-button" >
            Novo Usuário
          </button>
        </NavLink>
        <UserBox users={users} />
      </div>
    </>
  );
}
