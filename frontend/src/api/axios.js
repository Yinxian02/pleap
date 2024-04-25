import axios from 'axios';

export default axios.create({
    "Access-Control-Allow-Origin": "*",
    baseURL: 'http://localhost:5001'
});