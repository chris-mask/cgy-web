import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

const pre = '/policy'

// 获取导入立项名单模板
export function getApprovalListTemplate(data) {
  return request({
    url: pre + '/api/policy/policyApprovalList/getApprovalListTemplate',
    method: 'get',
    params: data
  })
}

// 上传模板导入立项名单信息
export function importApprovalListForTemplate(data) {
  return request({
    // url: pre + '/api/policy/policyApprovalList/importApprovalListForTemplate',
    url: '/crm/api/crm/sysExcelTask/uploadApprovalListImportFile',
    method: 'post',
    data
  })
}

// 查询所有立项清单信息和清单详情
export function queryApprovalListAndDetail(data) {
  return request({
    url: pre + '/api/policy/policyApprovalList/queryApprovalListAndDetail',
    method: 'post',
    data
  })
}

// 查询所有立项清单信息和清单详情
export function queryApprovalDetail(data) {
  return request({
    url: pre + '/api/policy/policyApprovalList/queryApprovalDetail',
    method: 'get',
    params: data
  })
}

// 删除立项管理
export function deletePolicyApproval(data) {
  return requestLoading({
    url: pre + '/api/policy/policyApprovalList/deletePolicyApproval',
    method: 'get',
    params: data
  })
}

// 新增立项
export function addPolicyApproval(data) {
  return requestLoading({
    url: pre + '/api/policy/policyApprovalList/addPolicyApproval',
    method: 'post',
    data
  })
}

// 编辑立项
export function updatePolicyApproval(data) {
  return requestLoading({
    url: pre + '/api/policy/policyApprovalList/updatePolicyApproval',
    method: 'post',
    data
  })
}

/**
 * 同步立项--通过企业ID
 * @param data
 */
export function queryPolicyApprovalList(data) {
  return requestLoading({
    url: pre + '/api/portalpublic/spider/queryPolicyApprovalList',
    method: 'get',
    params: data
  })
}

/**
 * 同步立项--通过企业名称
 * @param data
 */
export function queryPolicyApprovalListByCompanyName(data) {
  return requestLoading({
    url: pre + '/api/portalpublic/spider/queryPolicyApprovalListByCompanyName',
    method: 'get',
    params: data
  })
}
