import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_LOG_API_PROXY_KEY_WORD,
});

export default instance;
