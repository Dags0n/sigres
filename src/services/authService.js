import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/login';

// Fazer o login e salvar o token no localStorage
export const login = async (username, password) => {
    try {
        const response = await axios.post(API_URL, { username, password });
        const name = response.data.username;
        const token = response.data.token;
        const id = response.data.user.userId;
        const roles = response.data.user.roles;
        localStorage.setItem('token', token); // Armazena o token
        localStorage.setItem('username', name); // Armazena o username
        localStorage.setItem('id', id); // Armazena o id
        localStorage.setItem('roles', roles); // Armazena as roles
        return token;
    } catch (error) {
        console.error('Erro no login:', error);
        throw error; // Propaga o erro para ser tratado pelo componente
    }
};

// Logout e limpar o token
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('roles');
};

// Obter o token atual
export const getToken = () => {
    return localStorage.getItem('token');
};

// Obter o username atual
export const getUsername = () => {
    return localStorage.getItem('username') || "";
};

// Obter o id do user atual
export const getUserId = () => {
    return localStorage.getItem('id') || "";
};

// Verificar se o usuário está autenticado
export const isAuthenticated = () => {
    return !!getToken(); // Retorna true se o token existir
};
