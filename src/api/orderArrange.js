import request from '@/utils/request';
import requestLoading from '@/utils/requestLoading'

const pre = '/crm'

// 获取权限列表
export function queryOrderStatistics(data) {
  return request({
    url: pre + '/api/crm/orderstatistics/queryOrderStatistics',
    method: 'post',
    data
  })
}

// 导出查询的订单统计信息
export function exportOrderStatistics(data) {
  return requestLoading({
    url: pre + '/api/crm/orderstatistics/exportOrderStatistics',
    method: 'post',
    data
  })
}
