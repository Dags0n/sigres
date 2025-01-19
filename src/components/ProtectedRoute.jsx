// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isUserAdmin } from '../services/authService';

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    const adminRoutes = ['/settings', '/products/add', '/products/info', '/users', '/users/info', '/users/add', '/reports'];
    if (adminRoutes.includes(window.location.pathname) && !isUserAdmin()) {
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;
