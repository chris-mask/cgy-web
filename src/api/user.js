import request from '@/utils/request'
import Qs from 'qs'
import requestLoading from '@/utils/requestLoading'

// 登录接口
export function login(data) {
  return request({
    url: '/center/my_oauth/token',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(data) {
  return request({
    url: '/center/auth-controller/user/getLogout',
    method: 'post',
    data
  })
}

// 注册接口接口
export function register(data) {
  return request({
    url: '/center/system/free-user/register',
    method: 'post',
    data
  })
}

// 注册企业/个人
// export function registerCompany(data) {
//   return request({
//     url: '/center/system/free-user/registerCompany',
//     method: 'post',
//     data
//   })
// }

export function registerCompany(data) {
  return request({
    url: '/crm/api/register/crmCompany/registerCompany',
    method: 'post',
    data
  })
}

// 重置密码
export function retrievePassword(data) {
  return request({
    url: '/center/system/free-user/retrievePassword',
    method: 'post',
    data
  })
}

/**
 * 获取后台用户信息
 */

export function getUserInfo(data) {
  return request({
    url: '/center/auth-controller/user/getUserInfo',
    method: 'post',
    data
  })
}

/**
 * 修改系统用户密码
 * @param password
 * @param new_pwd
 * @param confirm_pwd
 */
export function changeMyPassword(password, new_pwd, confirm_pwd) {
  const data = Qs.stringify({
    new_pwd: new_pwd,
    password: password,
    confirm_pwd: confirm_pwd
  })
  return request({
    url: '/auth/new-change-pwd/',
    method: 'post',
    data
  })
}

// 获取企业验证码
export function getRegisterCompanyVerificationCode(data) {
  return request({
    url: '/center/system/free-user/getRegisterCompanyVerificationCode',
    method: 'get',
    params: data
  })
}

//获取个人验证码
export function getRegisterUserVerificationCode(data) {
  return request({
    url: '/center/system/free-user/getRegisterUserVerificationCode',
    method: 'get',
    params: data
  })
}

//获取重置密码验证码
export function getRetrievePasswordCode(data) {
  return request({
    url: '/center/system/free-user/getRetrievePasswordCode',
    method: 'get',
    params: data
  })
}

// 手机号码登陆
export function phoneToken(data) {
  return request({
    url: '/center/my_oauth/phoneToken',
    method: 'post',
    data
  })
}

//获取公司列表
export function getCompanyMenu(data) {
  return request({
    url: '/center/auth-controller/user/getCompanyMenu',
    method: 'get',
    params: data
  })
}

//获取导航菜单跟按钮权限
export function getNavigationMenu(data) {
  return request({
    url: '/center/auth-controller/user/getNavigationMenu',
    method: 'get',
    params: data
  })
}

//获取登录验证码
export function getLoginVerificationCode(data) {
  return request({
    url: '/center/system/free-user/getLoginVerificationCode',
    method: 'get',
    params: data
  })
}

// 注册用/检验公司统一信用代码
export function checkCompanyCodeUnique(data) {
  return request({
    url: '/center/api/checkCompany/checkCompanyCodeUnique',
    method: 'get',
    params: data
  })
}

// 注册用/校验公司名
export function checkCompanyNameUnique(data) {
  return request({
    url: '/center/api/checkCompany/checkCompanyNameUnique',
    method: 'get',
    params: data
  })
}

// 注册用/校验公司电话
export function checkCompanyOrPersonnelPhoneUnique(data) {
  return request({
    url: '/center/api/checkCompany/checkCompanyOrPersonnelPhoneUnique',
    method: 'get',
    params: data
  })
}

// 注册用/校验个人用户身份证号码
export function checkPersonnelIdCode(data) {
  return request({
    url: '/center/api/checkCompany/checkPersonnelIdCode',
    method: 'get',
    params: data
  })
}

//注册用/账号验证（如果存在则不能注册）
export function checkLoginNameUnique(data) {
  return request({
    url: '/center/api/checkUser/checkLoginNameUnique',
    method: 'get',
    params: data
  })
}
