import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

//获取用户列表
export function queryAllUserOfLevel(data) {
  return request({
    url: '/crm/api/crm/crmPerformanceAppraisal/queryAllUserOfLevel',
    method: 'post',
    data
  })
}

//绩效记录添加
export function savePerformance(data) {
  return requestLoading({
    url: '/crm/api/crm/crmPerformanceAppraisal/savePerformance',
    method: 'post',
    data
  })
}


//绩效记录查询
export function queryPerformance(data) {
  return request({
    url: '/crm/api/crm/crmPerformanceAppraisal/queryPerformance',
    method: 'post',
    data
  })
}

//绩效记录修改
export function editPerformance(data) {
  return requestLoading({
    url: '/crm/api/crm/crmPerformanceAppraisal/editPerformance',
    method: 'post',
    data
  })
}

//绩效记录删除
export function batchDeletePerformance(data) {
  return requestLoading({
    url: '/crm/api/crm/crmPerformanceAppraisal/batchDeletePerformance',
    method: 'post',
    data
  })
}

//导出绩效记录列表
export function exportPerformance(data) {
  return requestLoading({
    url: '/crm/api/crm/crmPerformanceAppraisal/exportPerformance',
    method: 'post',
    data
  })
}

// export function querySalePlanInfoById(query) {
//   return request({
//     url: '/crm/api/crm/crmSalePlan/querySalePlanInfoById',
//     method: 'get',
//     params: query
//   })
// }





