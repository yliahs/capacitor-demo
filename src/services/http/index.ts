import axios from 'axios'

const http = axios.create({
  baseURL: '/',
  timeout: 15000,
})

http.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err),
)

export default http
