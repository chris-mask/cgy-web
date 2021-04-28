/*
* http请求方法，下载通用
* */
import axios from 'axios'
import {MessageBox, Message, Loading} from 'element-ui'
import store from '@/store'
import secret from '@/utils/secret'
import qs from 'qs'

const Base64 = require('js-base64').Base64

// const openSectet = true


// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000000 // request timeout
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  // }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 加密,访客权限的人
    config.headers['Accept'] = '*/*'
    config.headers['Authorization'] = 'Basic ' + Base64.encode('browser:browser')
    config.headers['securitycode'] = store.getters.companyId;
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    // 判断是否拥有操作权限 -- token
    if (store.getters.accessToken) {
      // let each request carry token
      config.headers['Authorization'] = store.getters.tokenType + ' ' + store.getters.accessToken
    }
    // 设置公共的请求参数
    if (store.getters.companyId) {
      const {data} = config
      if (data) {
        config.data['companyId'] = store.getters.companyId
      } else {
        if (config.headers.post) {
          config.data = {companyId: store.getters.companyId}
        }
      }
    }

    //加密开关打开时进行加密
    if(store.getters.encryptOpen){
      // if (config.url.indexOf('/center') != -1) {
      //   let arr = config.url.split('/center')
      //   let url = arr[1];
      //   if (url != '/my_oauth/token' && url != '/auth-controller/user/getSecretKey' && url != '/auth-controller/user/getCompanyMenu' && url != '/auth-controller/user/getUserInfo' && url != '/auth-controller/user/getLogout') {
      //     let data = secret.Encrypt(JSON.stringify(config.data));
      //     let params = secret.Encrypt(JSON.stringify(config.params));
      //     config.data = JSON.stringify({a: data})
      //     config.params = {a: params}
      //   }
      // } else {
      //   let data = secret.Encrypt(JSON.stringify(config.data));
      //   let params = secret.Encrypt(JSON.stringify(config.params));
      //   config.data = {a: data}
      //   config.params = {a: params}
      // }
      let data = secret.Encrypt(JSON.stringify(config.data));
      let params = secret.Encrypt(JSON.stringify(config.params));
      config.data = {a: data}
      config.params = {a: params}
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
    const res = response.data;
    //加密开关打开时进行解密
    // if(openSectet){
    //   // if (response.config.url.indexOf('/center') != -1) {
    //   //   let arr = response.config.url.split('/center')
    //   //   let url = arr[1];
    //   //   if (url != '/my_oauth/token' && url != '/auth-controller/user/getSecretKey' && url != '/auth-controller/user/getCompanyMenu' && url != '/auth-controller/user/getUserInfo' && url != '/auth-controller/user/getLogout') {
    //   //     res.data = JSON.parse(secret.Decrypt(res.data));
    //   //   }
    //   // } else {
    //   //   res.data = JSON.parse(secret.Decrypt(res.data));
    //   // }
    //   res.data = JSON.parse(secret.Decrypt(res.data));
    // }
    // console.log('1231234',res);
    return res
    // if the custom code is not 200, it is judged as an error.
    // if (res.code !== 200) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //
    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('您已经退出登录，您可以点击取消停留在这个页面，或再次登录', '确认退出', {
    //       confirmButtonText: '重新登陆',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
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
