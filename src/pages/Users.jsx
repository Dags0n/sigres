import React from 'react';
import UserBox from '../components/user-box/UserBox';

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
      <div style={{ display: 'flex', justifyContent: 'start', flexWrap: 'wrap', marginTop: '20px'}}>
        <UserBox users={users} />
      </div>
    </>
  );
}
