import axios from 'axios';

export const server = axios.create({
  baseURL: `https://texastoc.com/server`,
  timeout: 30000,
});

export const ui = axios.create({
  baseURL: `https://texastoc.com`,
  timeout: 30000,
});

