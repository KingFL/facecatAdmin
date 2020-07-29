import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import Cookies from 'js-cookie'
import router from '../router'
// 创建axios实例
const service = axios.create({
  baseURL: '/api', // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers["Content-Type"] = "application/x-www-form-urlencoded"
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {

    if (!Cookies.get('isLogin')) {
      router.push('/')
    }
    return response
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: "系统繁忙,请稍后重试!!! ",
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
