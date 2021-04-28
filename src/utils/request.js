/*
* http请求方法
* */
import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import secret from '@/utils/secret'
import qs from 'qs'

const Base64 = require('js-base64').Base64
import router from '../router/index'

// const openSectet = true

// var sendDate = (new Date()).getTime();

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000000 // request timeout
  // headers: {
  //   "accept": "*/*",
  // }
})

// this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
// });

// request interceptor
service.interceptors.request.use(config => {
    // do something before request is sent
    // 加密,访客权限的人
    config.headers['Accept'] = '*/*'
    config.headers['Authorization'] = 'Basic ' + Base64.encode('browser:browser')
    config.headers['securitycode'] = store.getters.companyId
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    // config.headers['Content-Security-Policy'] = 'upgrade-insecure-requests'

    if (config.method === 'get') {
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }

    // 判断是否拥有操作权限 -- token
    if (store.getters.accessToken) {
      // let each request carry token
      config.headers['Authorization'] = store.getters.tokenType + ' ' + store.getters.accessToken
      // config.headers['securitycode'] = store.getters.securitycode
    }
    // 设置公共的请求参数
    if (config.data) {
      if(!config.data.companyId || config.data.companyId == ''){
        config.data['companyId'] = store.getters.companyId
      }
    }
    // if (store.getters.companyId) {
    //   const { data } = config
    //   console.log('111', config)
    //   if (data) {
    //     config.data['companyId'] = store.getters.companyId
    //   } else {
    //     if (config.headers.post) {
    //       config.data = { companyId: store.getters.companyId }
    //     }
    //   }
    // }

    let key = store.getters.secretKey
    let iv = store.getters.iv

    //加密开关打开时进行加密
    if (store.getters.encryptOpen) {
      if(!config.data){
        config.data = {}
      }
      //根据白名单过滤
      if (key != null) {
        let notList = store.getters.notEncUrls
        if (config.url.indexOf('/center') != -1) {
          let arr = config.url.split('/center')
          let url = arr[1]
          let not = notList.filter((item, index, arr) => {
            if (item == url) {
              return item
            }
          })
          if (not && not.length != 0) {
            not.forEach(list => {
              if (list == url) {
              } else {
                let data = secret.Encrypt(JSON.stringify(config.data),key,iv)
                let params = secret.Encrypt(JSON.stringify(config.params),key,iv)
                config.data = { a: data }
                config.params = { a: params }
              }
            })
          } else {
            let data = secret.Encrypt(JSON.stringify(config.data),key,iv)
            let params = secret.Encrypt(JSON.stringify(config.params),key,iv)
            config.data = { a: data }
            config.params = { a: params }
          }
        }
        else if (config.url.indexOf('/manage') != -1) {
          let arr = config.url.split('/manage/api')
          let url = '/api' + arr[1]
          let not = notList.filter((item, index, arr) => {
            if (item == url) {
              return item
            }
          })
          if (not && not.length != 0) {
            not.forEach(list => {
              if (list == url) {
              } else {
                let data = secret.Encrypt(JSON.stringify(config.data),key,iv)
                let params = secret.Encrypt(JSON.stringify(config.params),key,iv)
                config.data = { a: data }
                config.params = { a: params }
              }
            })
          } else {
            let data = secret.Encrypt(JSON.stringify(config.data),key,iv)
            let params = secret.Encrypt(JSON.stringify(config.params),key,iv)
            config.data = { a: data }
            config.params = { a: params }
          }
        }
        else if (config.url.indexOf('/development') != -1) {
          let arr = config.url.split('/development/api')
          let url = '/api' + arr[1]
          // if (url != '/manage/materiel/imporMaterielList') {
          let not = notList.filter((item, index, arr) => {
            if (item == url) {
              return item
            }
          })
          if (not && not.length != 0) {
            not.forEach(list => {
              if (list == url) {
              } else {
                let data = secret.Encrypt(JSON.stringify(config.data),key,iv)
                let params = secret.Encrypt(JSON.stringify(config.params),key,iv)
                config.data = { a: data }
                config.params = { a: params }
              }
            })
          } else {
            let data = secret.Encrypt(JSON.stringify(config.data),key,iv)
            let params = secret.Encrypt(JSON.stringify(config.params),key,iv)
            config.data = { a: data }
            config.params = { a: params }
          }
        }
        else if (config.url.indexOf('/crm') != -1) {
          let arr = config.url.split('/crm/api')
          let url = '/api' + arr[1]
          // if (url != '/manage/materiel/imporMaterielList') {
          let not = notList.filter((item, index, arr) => {
            if (item == url) {
              return item
            }
          })
          if (not && not.length != 0) {
            not.forEach(list => {
              if (list == url) {
              } else {
                let data = secret.Encrypt(JSON.stringify(config.data),key,iv)
                let params = secret.Encrypt(JSON.stringify(config.params),key,iv)
                config.data = { a: data }
                config.params = { a: params }
              }
            })
          } else {
            let data = secret.Encrypt(JSON.stringify(config.data),key,iv)
            let params = secret.Encrypt(JSON.stringify(config.params),key,iv)
            config.data = { a: data }
            config.params = { a: params }
          }
        }
        else {
          let data = secret.Encrypt(JSON.stringify(config.data),key,iv)
          let params = secret.Encrypt(JSON.stringify(config.params),key,iv)
          config.data = { a: data }
          config.params = { a: params }
        }
      }
    }
    // console.log('conf',config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    setTimeout(()=>{
      tryHideFullScreenLoading()
    },300)
    return Promise.reject(error)
  }
)

/**
 * 全局loading相关
 */
let loading

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading……',
  })
}

function endLoading() {
  loading.close()
}

// 那么 showFullScreenLoading() tryHideFullScreenLoading() 将同一时刻的请求合并。
// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}



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
    // var receiveDate = (new Date()).getTime();
    // var responseTimeMs = receiveDate - sendDate
    // console.log('sss',responseTimeMs)
    // if(responseTimeMs > 50000){
    //   showFullScreenLoading()
    // }

    //加密开关打开时进行解密
    // const hostname = location.host; //当前url主机名和端口号

    // return res
    // if the custom code is not 200, it is judged as an error.
    if (res.code == 401) {
      Message({
        message: res.message,
        type: 'success',
        duration: 5 * 1000
      })
      setTimeout(()=>{
        tryHideFullScreenLoading()
      },400)
      return res
    }

    // let key = store.getters.secretKey
    // let iv = store.getters.iv

    if (res.code !== 200) {
      if (store.getters.encryptOpen) {
        if (store.getters.secretKey != '') {
          Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
        }
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }

      // if (res.code == 403) {
      //   setTimeout(() => {
      //     // MessageBox.confirm('登录失效或者账号在其他设备登录，您可以点击取消停留在这个页面，或再次登录', '确认退出', {
      //     //   confirmButtonText: '重新登陆',
      //     //   cancelButtonText: '取消',
      //     //   type: 'warning'
      //     // }).then(() => {
      //     //   sessionStorage.removeItem('vuex')
      //     //   sessionStorage.removeItem('secretKey')
      //     //   sessionStorage.removeItem('iv')
      //     //   location.reload()
      //     // }).catch(() => {
      //     //   Message({
      //     //     type: 'info',
      //     //     message: '关闭'
      //     //   })
      //     // })
      //     Message({
      //       message: res.message || 'Error',
      //       type: 'error',
      //       duration: 2 * 1000
      //     })
      //   }, 500)
      //
      //   return
      // }

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014 || res.code === 402) {
        // to re-login
        MessageBox.confirm('您已经退出登录，您可以点击取消停留在这个页面，或再次登录', '确认退出', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // store.dispatch('logOut').then(() => {
          //   sessionStorage.removeItem('vuex')
          //   sessionStorage.removeItem('secretKey')
          //   sessionStorage.removeItem('iv')
          //   location.reload()
          // })
          sessionStorage.removeItem('vuex')
          sessionStorage.removeItem('secretKey')
          sessionStorage.removeItem('iv')
          location.reload()
        }).catch(() => {
          Message({
            type: 'info',
            message: '关闭'
          })
        })
      }
      setTimeout(()=>{
        tryHideFullScreenLoading()
      },400)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      let key = store.getters.secretKey
      let iv = store.getters.iv

      //加密开关打开时进行解密
      if (store.getters.encryptOpen) {
        if (key != null) {
          let notList = store.getters.notEncUrls
          var reg = new RegExp('^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$')
          if (response.config.url.indexOf('/center') != -1) {
            let arr = response.config.url.split('/center')
            let url = arr[1]
            let not = notList.filter((item, index, arr) => {
              if (item == url) {
                return item
              }
            })
            // if (url != '/my_oauth/token' && url != '/auth-controller/user/getSecretKey' && url != '/auth-controller/user/getCompanyMenu' && url != '/auth-controller/user/getUserInfo' && url != '/auth-controller/user/getLogout') {
            if (not && not.length != 0) {
              not.forEach(list => {
                if (list == url) {
                } else {
                  if (res.data) {
                    if (reg.test(res.data)) {
                      res.data = JSON.parse(secret.Decrypt(res.data,key,iv))
                    }
                  } else {
                    if (reg.test(res.message)) {
                      res.message = JSON.parse(secret.Decrypt(res.message,key,iv))
                    }
                  }
                }
              })
            } else {
              if (res.data) {
                if (reg.test(res.data)) {
                  res.data = JSON.parse(secret.Decrypt(res.data,key,iv))
                }
              } else {
                if (reg.test(res.message)) {
                  res.message = JSON.parse(secret.Decrypt(res.message,key,iv))
                }
              }
            }
          }
          else if (response.config.url.indexOf('/manage') != -1) {
            let arr = response.config.url.split(process.env.BASE_API + '/manage')
            let url = arr[1]
            let not = notList.filter((item, index, arr) => {
              if (item == url) {
                return item
              }
            })
            if (not && not.length != 0) {
              not.forEach(list => {
                if (list == url) {
                } else {
                  if (res.data) {
                    if (reg.test(res.data)) {
                      res.data = JSON.parse(secret.Decrypt(res.data,key,iv))
                    }
                  } else {
                    if (reg.test(res.message)) {
                      res.message = JSON.parse(secret.Decrypt(res.message,key,iv))
                    }
                  }
                }
              })
            } else {
              if (res.data) {
                if (reg.test(res.data)) {
                  res.data = JSON.parse(secret.Decrypt(res.data,key,iv))
                }
              } else {
                if (reg.test(res.message)) {
                  res.message = JSON.parse(secret.Decrypt(res.message,key,iv))
                }
              }
            }
          }
          else if (response.config.url.indexOf('/development') != -1) {
            let arr = response.config.url.split(process.env.BASE_API + '/development')
            let url = arr[1]
            let not = notList.filter((item, index, arr) => {
              if (item == url) {
                return item
              }
            })
            if (not && not.length != 0) {
              not.forEach(list => {
                if (list == url) {
                } else {
                  if (res.data) {
                    if (reg.test(res.data)) {
                      res.data = JSON.parse(secret.Decrypt(res.data,key,iv))
                    }
                  } else {
                    if (reg.test(res.message)) {
                      res.message = JSON.parse(secret.Decrypt(res.message,key,iv))
                    }
                  }
                }
              })
            } else {
              if (res.data) {
                if (reg.test(res.data)) {
                  res.data = JSON.parse(secret.Decrypt(res.data,key,iv))
                }
              } else {
                if (reg.test(res.message)) {
                  res.message = JSON.parse(secret.Decrypt(res.message,key,iv))
                }
              }
            }
          }
          else if (response.config.url.indexOf('/crm') != -1) {
            let arr = response.config.url.split(process.env.BASE_API + '/crm')
            let url = arr[1]
            let not = notList.filter((item, index, arr) => {
              if (item == url) {
                return item
              }
            })
            if (not && not.length != 0) {
              not.forEach(list => {
                if (list == url) {
                } else {
                  if (res.data) {
                    if (reg.test(res.data)) {
                      res.data = JSON.parse(secret.Decrypt(res.data,key,iv))
                    }
                  } else {
                    if (reg.test(res.message)) {
                      res.message = JSON.parse(secret.Decrypt(res.message,key,iv))
                    }
                  }
                }
              })
            } else {
              if (res.data) {
                if (reg.test(res.data)) {
                  res.data = JSON.parse(secret.Decrypt(res.data,key,iv))
                }
              } else {
                if (reg.test(res.message)) {
                  res.message = JSON.parse(secret.Decrypt(res.message,key,iv))
                }
              }
            }
          }
          else {
            if (res.data) {
              if (reg.test(res.data)) {
                res.data = JSON.parse(secret.Decrypt(res.data,key,iv))
              }
            } else {
              if (reg.test(res.message)) {
                res.message = JSON.parse(secret.Decrypt(res.message,key,iv))
              }
            }
          }
        }
      }
      setTimeout(()=>{
        tryHideFullScreenLoading()
      },400)
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // setTimeout(() => {
      if (error.response.data.code == 403) {
        let msg = error.response.data.message.split('|')
        let msgErr = '抱歉，您没有' + msg[1] + '权限，请联系管理员添加权限'
        Message({
          message: msgErr,
          type: 'error',
          duration: 5 * 1000
        })
      }else{
        Message({
          message: error.response.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      }

      // tryHideFullScreenLoading()

    // }, 400)

    return Promise.reject(error)

  }
)

export default service
