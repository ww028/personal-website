import axios from 'axios'
// import qs from 'qs'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.API, // url = base url + request url
  // baseURL: 'http://localhost:3001/', // url = base url + request url
  baseURL: 'http://39.100.228.198:3001/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response
    if (res.data.code === 200) {
      const res_data = res.data.data;
      return res_data
    } else {
      return Promise.reject(error)
    }
  },
  error => {
    console.log('err debug' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
