import axios from 'axios';

// Cria a instância do Axios com base na URL definida no .env
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});