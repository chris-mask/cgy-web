import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

// 查询条件变量列表
export function queryVariableList(data) {
  return request({
    url: '/policy/api/policy/policyApplyVariable/queryVariableList',
    method: 'post',
    data
  })
}

// 新增条件变量列表
export function createVariable(data) {
  return request({
    url: '/policy/api/policy/policyApplyVariable/createVariable',
    method: 'post',
    data
  })
}

// 修改条件变量列表
export function editVariable(data) {
  return request({
    url: '/policy/api/policy/policyApplyVariable/editVariable',
    method: 'post',
    data
  })
}

// 删除条件变量列表
export function deleteVariable(data) {
  return request({
    url: '/policy/api/policy/policyApplyVariable/deleteVariable',
    method: 'get',
    params: data
  })
}

// 删除条件变量列表
export function deleteComparisonInfo(data) {
  return request({
    url: '/policy/api/policy/policyApplyConditionComparisonSymbol/deleteComparison',
    method: 'get',
    params: data
  })
}

// 根据变量id获取比较符
export function getComparisonByVarId(data) {
  return request({
    url: '/policy/api/policy/policyApplyConditionComparisonSymbol/getComparisonByVarId',
    method: 'get',
    params: data
  })
}



