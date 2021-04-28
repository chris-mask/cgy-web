import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

const pre = '/policy'

// 查询立项公示信息
export function findApprovalPublicity(data) {
  return request({
    url: pre + '/api/policy/policyApprovalPublicity/findApprovalPublicity',
    method: 'post',
    data
  })
}

// 编辑立项公示信息
export function editApprovalPublicity(data) {
  return requestLoading({
    url: pre + '/api/policy/policyApprovalPublicity/editApprovalPublicity',
    method: 'post',
    data
  })
}

// 手动新增立项公示信息
export function saveApprovalPublicity(data) {
  return requestLoading({
    url: pre + '/api/policy/policyApprovalPublicity/saveApprovalPublicity',
    method: 'post',
    data
  })
}

// 批量删除立项公示信息
export function deleteApprovalPublicity(data) {
  return requestLoading({
    url: pre + '/api/policy/policyApprovalPublicity/deleteApprovalPublicity',
    method: 'post',
    data
  })
}

// 导出公示结果为Excel
export function exportApprovalPublicity(data) {
  return requestLoading({
    url: pre + '/api/policy/policyApprovalPublicity/exportApprovalPublicity',
    method: 'post',
    data
  })
}

// 获取公示结果
export function gainApprovalPublicity(data) {
  return request({
    url: pre + '/api/policy/policyApprovalPublicity/gainApprovalPublicity',
    method: 'post',
    data
  })
}

// 补充文件上传
export function supplementFileUpload(data) {
  return requestLoading({
    url: pre + '/api/policy/policyApprovalPublicity/supplementFileUpload',
    method: 'post',
    data
  })
}
