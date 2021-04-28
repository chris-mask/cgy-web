import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

// 新增项目规划
export function saveProjectPlan(data) {
  return requestLoading({
    url: '/crm/api/crm/crmProjectPlan/saveProjectPlan',
    method: 'POST',
    data
  })
}

//修改项目规划
export function updateProjectPlan(data) {
  return requestLoading({
    url: '/crm/api/crm/crmProjectPlan/updateProjectPlan',
    method: 'POST',
    data
  })
}

//查询项目规划列表
export function queryProjectPlanList(data) {
  return request({
    url: '/crm/api/crm/crmProjectPlan/queryProjectPlanList',
    method: 'POST',
    data
  })
}

// 删除项目规划记录[批量]
export function deleteProjectPlanByIds(data) {
  return requestLoading({
    url: '/crm/api/crm/crmProjectPlan/deleteProjectPlanByIds',
    method: 'POST',
    data
  })
}






