import axios from 'axios';

export default axios.create({
  baseURL: `https://texastoc.com/server`,
  timeout: 30000,
});
