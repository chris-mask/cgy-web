import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

const pre = '/crm'

// 查询单个回款计划
export function queryPaymentPlan(data) {
  return request({
    url: pre + '/api/crm/crmPaymentPlan/queryPaymentPlan',
    method: 'POST',
    data
  })
}

// 保存回款计划
export function savePaymentPlan(data) {
  return requestLoading({
    url: pre + '/api/crm/crmPaymentPlan/savePaymentPlan',
    method: 'POST',
    data
  })
}
