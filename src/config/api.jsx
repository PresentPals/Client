import axios from 'axios'


export default axios.create({
  baseURL: 'https://presentpals.com',
  timeout: 5000,
  withCredentials: true
})