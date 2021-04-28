import request from '@/utils/request';
import requestNotCompanyId from '@/utils/requestNotCompanyId';
import requestLoading from '@/utils/requestLoading'

const crm = '/crm'
const policy = '/policy'

//项目进度统计
// 统计订单项目进度跟踪信息
export function queryOrderProjectStatistics(data) {
  return request({
    url: crm + '/api/crm/orderstatistics/queryOrderProjectStatistics',
    method: 'post',
    data
  })
}
// 导出订单项目进度跟踪信息
export function exportOrderProjectStatistics(data) {
  return requestLoading({
    url: crm + '/api/crm/orderstatistics/exportOrderProjectStatistics',
    method: 'post',
    data
  })
}

//项目补助汇总表
//项目补助统计列表
export function queryProjectStatisticalList(data) {
  return requestNotCompanyId({
    url: policy + '/api/policy/projectStatistical/queryProjectStatisticalList',
    method: 'post',
    data
  })
}

//导出项目补助统计统计列表
export function projectStatisticalInfo(data) {
  return requestLoading({
    url: policy + '/api/policy/projectStatistical/projectStatisticalInfo',
    method: 'post',
    data
  })
}

//回款统计表
//查询回款统计表
export function queryReceiptStatisticsTable(data) {
  return requestLoading({
    url: crm + '/api/crm/order/queryReceiptStatisticsTable',
    method: 'post',
    data
  })
}

//导出回款统计表
export function exportReceiptStatisticsTable(data) {
  return requestLoading({
    url: crm + '/api/crm/order/exportReceiptStatisticsTable',
    method: 'post',
    data
  })
}
