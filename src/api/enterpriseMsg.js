import request from '@/utils/request'
import requestNotCompanyId from '@/utils/requestNotCompanyId'
import requestLoading from '@/utils/requestLoading'

var manage = '/center';

// 查询企业列表
export function getCompanyList(data) {
  return requestNotCompanyId({
    url: manage + '/company/user/getCompanyList',
    method: 'post',
    data
  })
}

// 更换管理员获取验证码
export function getCompanyManagerCode(data) {
  return requestNotCompanyId({
    url: manage + '/company/user/getCompanyManagerCode',
    method: 'post',
    data
  })
}

// 更换管理员操的下一步操作
export function nextStep(data) {
  return requestNotCompanyId({
    url: manage + '/company/user/nextStep',
    method: 'post',
    data
  })
}

// 确认更换管理员
export function confirmReplacement(data) {
  return requestNotCompanyId({
    url: manage + '/company/user/confirmReplacement',
    method: 'post',
    data
  })
}

// 根据id查询公司详情
export function queryCompanyDetails(data) {
  return requestNotCompanyId({
    url: manage + '/company/user/queryCompanyDetails',
    method: 'get',
    params: data
  })
}

// 根据id查询公司详情
export function queryCurrentCompanyDetails(data) {
  return requestNotCompanyId({
    url: manage + '/company/user/queryCurrentCompanyDetails',
    method: 'get',
    params: data
  })
}

// 确认更换管理员
export function editCompanyInfo(data) {
  return requestNotCompanyId({
    url: manage + '/company/user/editCompanyInfo',
    method: 'post',
    data
  })
}



// 确认通过支付记录
export function confirmPay(data) {
  return requestNotCompanyId({
    url: manage + '/company/user/payment/confirm',
    method: 'get',
    params: data
  })
}

// 删除支付记录
export function deletePay(data) {
  return requestNotCompanyId({
    url: manage + '/company/user/payment/delete',
    method: 'get',
    params: data
  })
}

// 确认不通过支付记录
export function notconfirm(data) {
  return requestNotCompanyId({
    url: manage + '/company/user/payment/notconfirm',
    method: 'get',
    params: data
  })
}

// 查询企业历史支付记录
export function queryhistorypay(data) {
  return requestNotCompanyId({
    url: manage + '/company/user/payment/queryhistorypay',
    method: 'post',
    data
  })
}

// 新增支付记录
export function savePay(data) {
  return requestNotCompanyId({
    url: manage + '/company/user/payment/save',
    method: 'post',
    data
  })
}

// 修改支付记录
export function updatePay(data) {
  return requestNotCompanyId({
    url: manage + '/company/user/payment/update',
    method: 'post',
    data
  })
}
