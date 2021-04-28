import axios from 'axios'
import {MessageBox, Message, Loading} from 'element-ui'
import store from '@/store'
import secret from '@/utils/secret'
import qs from 'qs'

const Base64 = require('js-base64').Base64

// const openSectet = true

// var sendDate = (new Date()).getTime();

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000000, // request timeout
  // headers: {
  //   "accept": "*/*",
  // }
})

// request interceptor
service.interceptors.request.use(config => {
    // do something before request is sent
    // 加密,访客权限的人
    config.headers['Accept'] = '*/*'
    config.headers['Authorization'] = 'Basic ' + Base64.encode('browser:browser')
    config.headers['securitycode'] = store.getters.companyId
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

    // 判断是否拥有操作权限 -- token
    if (store.getters.accessToken) {
      // let each request carry token
      config.headers['Authorization'] = store.getters.tokenType + ' ' + store.getters.accessToken
      // config.headers['securitycode'] = store.getters.securitycode
    }
    // 设置公共的请求参数
    // if (store.getters.companyId) {
    //   const {data} = config
    //   if (data) {
    //     config.data['companyId'] = store.getters.companyId;
    //     // secret.Encrypt(config.data['companyId'])
    //   } else {
    //     if (config.headers.post) {
    //       config.data = {companyId: store.getters.companyId}
    //       // secret.Encrypt(config.data)
    //     }
    //   }
    // }

    let key = store.getters.secretKey
    let iv = store.getters.iv

    //加密开关打开时进行加密
    if (store.getters.encryptOpen) {
      if (key != null) {
        let notList = store.getters.notEncUrls
        if (config.url.indexOf('/center') != -1) {
          let arr = config.url.split('/center')
          let url = arr[1]
          let not = notList.filter((item, index, arr) => {
            if (item == url) {
              return item
            }
          });
          if(not && not.length != 0){
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
    // const hostname = location.host; //当前url主机名和端口号

    // return res
    // if the custom code is not 200, it is judged as an error.
    if (res.code == 401) {
      Message({
        message: res.message,
        type: 'success',
        duration: 5 * 1000
      })
      return res
    }

    if (res.code !== 200) {
      if (store.getters.encryptOpen) {
        if (key != null) {
          Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
        }
      }else{
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }

      // if (res.code == 402) {
      //   setTimeout(() => {
      //     MessageBox.confirm('登录失效或者账号在其他设备登录，您可以点击取消停留在这个页面，或再次登录', '确认退出', {
      //       confirmButtonText: '重新登陆',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(() => {
      //       sessionStorage.removeItem('vuex')
      //       sessionStorage.removeItem('secretKey')
      //       sessionStorage.removeItem('iv')
      //       location.reload()
      //     }).catch(() => {
      //       Message({
      //         type: 'info',
      //         message: '关闭'
      //       });
      //     });
      //   }, 500)
      //
      //   return
      // }

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014 || res.code == 402) {
        // to re-login
        MessageBox.confirm('您已经退出登录，您可以点击取消停留在这个页面，或再次登录', '确认退出', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // store.dispatch('logOut').then(() => {
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
          });
        });
      }
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

      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
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

    return Promise.reject(error);

  }
)

export default service
