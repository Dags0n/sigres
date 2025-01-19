import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logout(); // Chama a função logout para limpar o localStorage
        navigate('/login'); // Redireciona para a página de login
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default Logout;
