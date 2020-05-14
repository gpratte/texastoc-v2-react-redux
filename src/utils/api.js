import axios from 'axios';

export const server = axios.create({
  baseURL: `https://texastoc.com/server`,
  timeout: 30000,
});

