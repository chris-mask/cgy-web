import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

const pre = '/crm'

// 新增流程信息
export function saveFlowInfo(data) {
  return requestLoading({
    url: pre + '/api/crm/appFlow/saveFlowInfo',
    method: 'post',
    data
  })
}

// 删除流程信息
export function deleteFlowInfo(data) {
  return requestLoading({
    url: pre + '/api/crm/appFlow/deleteFlowInfo',
    method: 'get',
    params: data
  })
}

// 删除流程节点信息
export function deleteNodeInfo(data) {
  return request({
    url: pre + '/api/crm/appFlow/deleteNodeInfo',
    method: 'get',
    params: data
  })
}

// 修改流程信息
export function editFlowInfo(data) {
  return requestLoading({
    url: pre + '/api/crm/appFlow/editFlowInfo',
    method: 'post',
    data
  })
}

// 查询流程信息
export function queryFlowInfo(data) {
  return request({
    url: pre + '/api/crm/appFlow/queryFlowInfo',
    method: 'post',
    data
  })
}

// 查询流程信息:用于项目库下拉列表
export function queryFlowInfoNotAuthUrl(data) {
  return request({
    url: pre + '/api/crm/appFlow/queryFlowInfoNotAuthUrl',
    method: 'post',
    data
  })
}

// 查询流程详情
export function queryFlowInfoDetails(data) {
  return request({
    url: pre + '/api/crm/appFlow/queryFlowInfoDetails',
    method: 'post',
    data
  })
}

// 上升下降
export function upOrDown(data) {
  return request({
    url: pre + '/api/crm/appFlow/upOrDown',
    method: 'post',
    data
  })
}

// 修改流程信息并同步覆盖未完成订单
export function editFlowInfoCoverOrderProcess(data) {
  return requestLoading({
    url: pre + '/api/crm/appFlow/editFlowInfoCoverOrderProcess',
    method: 'post',
    data
  })
}

// 流程图下拉框
export function flowSelectframe(data) {
  return request({
    url: pre + '/api/crm/appFlow/flowSelectframe',
    method: 'post',
    data
  })
}
