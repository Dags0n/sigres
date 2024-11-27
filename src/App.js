import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Users from './pages/users/Users';
import AddUser from './pages/users/AddUser';
import Login from './pages/login/Login';
import InfoUser from './pages/users/InfoUser';
import Products from './pages/products/Products';
import AddProduct from './pages/products/AddProduct';
import InfoProduct from './pages/products/InfoProduct';
import Tables from './pages/tables/Tables';
import Orders from './pages/orders/Orders';
import Settings from './pages/settings/Settings';

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
    element: 
    <Navbar >
      <Products />
    </Navbar>,
  },
  {
    path: '/products/add',
    element: 
    <Navbar >
      <AddProduct />
    </Navbar>,
  },
  {
    path: '/products/info',
    element: 
    <Navbar >
      <InfoProduct />
    </Navbar>,
  },
  {
    path: '/tables',
    element: 
    <Navbar >
      <Tables />
    </Navbar>,
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
    element: <Navbar >
      <Orders />
    </Navbar>,
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
    element: 
    <Navbar >
      <Settings />
    </Navbar>,
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
