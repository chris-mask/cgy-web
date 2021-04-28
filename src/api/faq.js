import request from '@/utils/request'

/**
 * 常见问题api
 */

/**
 * 新增
 * @param data
 */
export function saveCrmFaq(data) {
  return request({
    url: '/crm/api/crm/crmFaq/saveCrmFaq',
    method: 'POST',
    data
  })
}


/**
 * 删除
 * @param data
 */
export function delCrmFaqByIds(data) {
  return request({
    url: '/crm/api/crm/crmFaq/delCrmFaqByIds',
    method: 'POST',
    data
  })
}

/**
 * 编辑
 * @param data
 */
export function updateCrmFaqByIds(data) {
  return request({
    url: '/crm/api/crm/crmFaq/updateCrmFaqByIds',
    method: 'POST',
    data
  })
}

/**
 * 查询
 * @param data
 */
export function queryCrmFaqList(data) {
  return request({
    url: '/crm/api/crm/crmFaq/queryCrmFaqList',
    method: 'POST',
    data
  })
}




