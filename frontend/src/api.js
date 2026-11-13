import axios from 'axios';
const api = axios.create({ baseURL: 'https://hs-gold-backend.onrender.com/api' });
export default api;
