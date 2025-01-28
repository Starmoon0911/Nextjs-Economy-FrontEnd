import axios from 'axios'
axios.defaults.baseURL = process.env.BackEndURL || 'http://localhost:9000';

export default axios;
