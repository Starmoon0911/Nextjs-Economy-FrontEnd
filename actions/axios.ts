import axios from 'axios'
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BackEndURL || 'https://ecobackend.wei0911.us.kg';

export default axios;
