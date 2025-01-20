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
import Tables from './pages/tables/Tables';
import Orders from './pages/orders/Orders';
import Settings from './pages/settings/Settings';
import Reports from './pages/reports/Reports';
import Stock from './pages/stock/Stock';
import Chat from './pages/chat/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './pages/logout/Logout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Navbar>
          <Home />
        </Navbar>
      </ProtectedRoute>
    ),
  },
  {
    path: '/products',
    element: 
      <ProtectedRoute>
        <Navbar >
          <Products />
        </Navbar>
      </ProtectedRoute>
  },
  {
    path: '/products/add',
    element: 
      <ProtectedRoute>
        <Navbar >
          <AddProduct />
        </Navbar>
      </ProtectedRoute>
  },
  {
    path: '/tables',
    element: 
      <ProtectedRoute>
        <Navbar >
          <Tables />
        </Navbar>
      </ProtectedRoute>
  },
  {
    path: '/reports',
    element: 
      <ProtectedRoute>
        <Navbar >
          <Reports />
        </Navbar>
      </ProtectedRoute>
  },
  {
    path: '/stock',
    element: 
      <ProtectedRoute>
        <Navbar >
          <Stock />
        </Navbar>
      </ProtectedRoute>
  },
  {
    path: '/orders',
    element: 
      <ProtectedRoute>
        <Navbar >
          <Orders />
        </Navbar>
      </ProtectedRoute>
  },
  {
    path: '/users',
    element:
      <ProtectedRoute>
        <Navbar>
          <Users />
        </Navbar>
      </ProtectedRoute>
  },
  {
    path: '/users/add',
    element:
      <ProtectedRoute>
        <Navbar>
          <AddUser />
        </Navbar>
      </ProtectedRoute>
  },
  {
    path: '/users/info',
    element:
      <ProtectedRoute>
        <Navbar>
          <InfoUser />
        </Navbar>
      </ProtectedRoute>
  },
  {
    path: '/settings',
    element: 
      <ProtectedRoute>
        <Navbar >
          <Settings />
        </Navbar>
      </ProtectedRoute>
  },
  {
    path: '/chat',
    element:
      <ProtectedRoute>
        <Navbar>
          <Chat />
        </Navbar>
      </ProtectedRoute>
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
