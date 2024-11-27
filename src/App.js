import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Users from './pages/users/Users';
import AddUser from './pages/users/AddUser';
import Login from './pages/login/Login';
import InfoUser from './pages/users/InfoUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Navbar>
        <Home />
      </Navbar>
    ),
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
    element:
      <Navbar>
        <Users />
      </Navbar>,
  },
  {
    path: '/users/add',
    element:
      <Navbar>
        <AddUser />
      </Navbar>,
  },
  {
    path: '/users/info',
    element:
      <Navbar>
        <InfoUser />
      </Navbar>,
  },
  {
    path: '/settings',
    element: <Navbar ><h1>Configurações</h1></Navbar>,
  },
  {
    path: '/chat',
    element: <Navbar ><h1>Chat</h1></Navbar>,
  },
  {
    path: '/login',
    element: <Login />,
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
