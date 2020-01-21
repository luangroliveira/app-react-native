import Axios from 'axios';

const axios = axios.create({
    baseURL: 'http://192.168.29.69:3333',
})

export default axios;