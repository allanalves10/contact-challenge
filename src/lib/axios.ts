import axios from 'axios'
import { API_CEP_URL } from '../config/environment'

const api = axios.create({
  baseURL: API_CEP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api