import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const Base64 = require('js-base64').Base64

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  // }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 加密,访客权限的人
    config.headers['Authorization'] = 'Basic ' + Base64.encode('browser:browser')
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

    // 判断是否拥有操作权限 -- token
    if (store.getters.accessToken) {
      // let each request carry token
      config.headers['Authorization'] = store.getters.tokenType + ' ' + store.getters.accessToken
    }
    // 设置公共的请求参数
    if (store.getters.companyId) {
      const { data } = config
      if (data) {
        config.data['companyId'] = store.getters.companyId
      } else {
        if (config.headers.post) {
          config.data = { companyId: store.getters.companyId }
        }
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
