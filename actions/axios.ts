import axios from 'axios'
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BackEndURL || 'http://localhost:9000';

export default axios;
