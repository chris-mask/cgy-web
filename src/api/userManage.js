import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

// 获取用户列表
export function getUserList(data) {
  return request({
    url: '/center/system/user/queryUserInfo',
    method: 'post',
    data
  })
}

// 选择用户列表
export function queryUserList(data) {
  return request({
    url: '/center/system/user/queryUserList',
    method: 'post',
    data
  })
}

// 新增用户
export function addUser(data) {
  return requestLoading({
    url: '/center/system/user/addUser',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUser(data) {
  return requestLoading({
    url: '/center/system/user/deleteUserById',
    method: 'get',
    params: data
  })
}

// 编辑用户
export function editUserById(data) {
  return requestLoading({
    url: '/center/system/user/editUserById',
    method: 'post',
    data
  })
}

// 获取用户详情
export function getUserInfo(data) {
  return request({
    url: '/center/system/user/queryUserInfoById',
    method: 'get',
    params: data
  })
}

// 上升或者下降操作
export function goUpOrDown(data) {
  return request({
    url: '/center/system/user/goUpOrDown',
    method: 'post',
    data
  })
}

// 查询公司角色
export function getCompanyRole(data) {
  return request({
    url: '/center/system/user/queryRoleCompany',
    method: 'get',
    params: data
  })
}

// 根据登陆账号获取用户信息
export function queryUser(data) {
  return request({
    url: '/center/system/user/queryUser',
    method: 'get',
    params: data
  })
}

// 修改密码
export function changePassWord(data) {
  return request({
    url: '/center/system/user/changePassword',
    method: 'post',
    data
  })
}

// 用户修改个人信息
export function changePersonalInformation(data) {
  return request({
    url: '/center/system/user/changePersonalInformation',
    method: 'post',
    data
  })
}

// 获取用户解绑手机号验证码
export function getUserUntyingCode(data) {
  return request({
    url: '/center/system/user/getUserUntyingCode',
    method: 'get',
    params: data
  })
}

// 获取用户绑定新手机号验证码
export function getUserBindingNewPhoneCode(data) {
  return request({
    url: '/center/system/user/getUserBindingNewPhoneCode',
    method: 'get',
    params: data
  })
}

// 用户更换绑定手机号下一步
export function userChangePhoneNextStep(data) {
  return request({
    url: '/center/system/user/userChangePhoneNextStep',
    method: 'get',
    params: data
  })
}

// 用户确认更换手机号
export function userConfirmChangePhone(data) {
  return request({
    url: '/center/system/user/userConfirmChangePhone',
    method: 'get',
    params: data
  })
}
