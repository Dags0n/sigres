import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/login';

// Fazer o login e salvar o token no localStorage
export const login = async (username, password) => {
    try {
        const response = await axios.post(API_URL, { username, password });
        const token = response.data.token;
        localStorage.setItem('token', token); // Armazena o token
        return token;
    } catch (error) {
        console.error('Erro no login:', error);
        throw error; // Propaga o erro para ser tratado pelo componente
    }
};

// Logout e limpar o token
export const logout = () => {
    localStorage.removeItem('token');
};

// Obter o token atual
export const getToken = () => {
    return localStorage.getItem('token');
};

// Verificar se o usuário está autenticado
export const isAuthenticated = () => {
    return !!getToken(); // Retorna true se o token existir
};
