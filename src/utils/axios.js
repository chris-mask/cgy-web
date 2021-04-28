import axios from 'axios'

// axios.defaults.baseURL = 'http://192.168.2.240:8888'
axios.defaults.baseURL = 'https://www.yanfayun.vip'
// axios.defaults.baseURL = 'http://120.24.205.135:8888'
// axios.defaults.baseURL = 'http://192.168.2.175:8891/';

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // const mytoken = localStorage.getItem('mytest')
  // if (mytoken) {
  //   config.headers.Authorization = mytoken
  // }
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
  axios.defaults.transformRequest = [function(data) {
    let src = ''
    for (const item in data) {
      src += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
    }
    return src
  }]
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default axios
