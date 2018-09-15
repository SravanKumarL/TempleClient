import axios from 'axios';

const instance = axios.create({
  // baseURL: process.env.SERVER_URI ? process.env.SERVER_URI : 'http://localhost:7000',
  baseURL: 'https://temple-api-mongo.herokuapp.com',
  // baseURL: 'http://localhost:7000',
})

export default instance;