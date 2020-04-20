import axios from 'axios'
import fn from '../assets/js/fn.js'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if(!config.data.flag){
      config.data.sign = fn.createSign(config.data)
    }
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
    } else if(res.data.status === '1'){
      return res.data.districts[0].districts
    } else{
      return Promise.reject({message: '请求失败'})
    }
  },
  error => {
    console.log('err debug' + error) // for debug
  }
)

export default service
