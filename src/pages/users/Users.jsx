import React from 'react';
import UserBox from '../../components/user-box/UserBox';
import { Typography } from '@mui/material';

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 900, m: "0 0 10px 0", justifySelf: 'flex-start' }}>
          Usuários
        </Typography>
        <UserBox users={users} />
      </div>
    </>
  );
}
