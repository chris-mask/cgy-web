import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

// 申报账号列表
export function queryWebsiteAccountList(data) {
  return request({
    url: '/crm/api/crm/appWebsiteAccount/queryWebsiteAccountList',
    method: 'POST',
    data
  })
}

//新增-网站帐号
export function saveWebsiteAccount(data) {
  return requestLoading({
    url: '/crm/api/crm/appWebsiteAccount/saveWebsiteAccount',
    method: 'POST',
    data
  })
}

//变更-网站帐号
export function updateWebsiteAccount(data) {
  return requestLoading({
    url: '/crm/api/crm/appWebsiteAccount/updateWebsiteAccount',
    method: 'POST',
    data
  })
}

// 删除-申报账号
export function deleteWebsiteAccountByIds(data) {
  return requestLoading({
    url: '/crm/api/crm/appWebsiteAccount/deleteWebsiteAccountByIds',
    method: 'POST',
    data
  })
}

// 详情-申报账号
export function queryWebsiteAccountInfoById(data) {
  return request({
    url: '/crm/api/crm/appWebsiteAccount/queryWebsiteAccountInfoById',
    method: 'get',
    params: data
  })
}






