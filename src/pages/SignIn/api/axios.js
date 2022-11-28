import axios from 'axios'

export default axios.create({
  baseURL: 'http://192.168.0.108:5000',
  timeout: 6000,
})
