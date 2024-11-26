import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar ><h1>Home</h1></Navbar>,
  },
  {
    path: '/products',
    element: <Navbar ><h1>Produtos</h1></Navbar>,
  },
  {
    path: '/tables',
    element: <Navbar ><h1>Mesas</h1></Navbar>,
  },
  {
    path: '/reports',
    element: <Navbar ><h1>Relatórios</h1></Navbar>,
  },
  {
    path: '/stock',
    element: <Navbar ><h1>Estoque</h1></Navbar>,
  },
  {
    path: '/orders',
    element: <Navbar ><h1>Pedidos</h1></Navbar>,
  },
  {
    path: '/users',
    element: <Navbar ><h1>Usuários</h1></Navbar>,
  },
  {
    path: '/settings',
    element: <Navbar ><h1>Configurações</h1></Navbar>,
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
