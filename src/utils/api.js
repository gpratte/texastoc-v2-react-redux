import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:8080/apis`,
  timeout: 30000,
});
