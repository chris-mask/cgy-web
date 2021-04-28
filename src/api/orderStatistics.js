import request from '@/utils/request';
import requestLoading from '@/utils/requestLoading'

const pre = '/crm'

// 签单统计表查询
export function querySignOrderStatistical(data) {
  return request({
    url: pre + '/api/crm/orderstatistics/querySignOrderStatistical',
    method: 'post',
    data
  })
}

// 签单统计表查询结果EXCEL导出
export function querySignOrderStatisticalExportForExcel(data) {
  return requestLoading({
    url: pre + '/api/crm/orderstatistics/querySignOrderStatisticalExportForExcel',
    method: 'post',
    data
  })
}


// 工单统计表查询
export function queryWorkOrderStatistical(data) {
  return request({
    url: pre + '/api/crm/orderstatistics/queryWorkOrderStatistical',
    method: 'post',
    data
  })
}

// 工单统计表查询结果EXCEL导出
export function queryWorkOrderStatisticalExportForExcel(data) {
  return requestLoading({
    url: pre + '/api/crm/orderstatistics/queryWorkOrderStatisticalExportForExcel',
    method: 'post',
    data
  })
}
 