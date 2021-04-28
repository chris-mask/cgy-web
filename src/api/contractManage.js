import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

const pre = '/crm'

// 根据企业ID检查企业必填字段
export function checkRequiredCompanyInfo(data) {
  return request({
    url: pre + '/api/crm/contract/checkRequiredCompanyInfo',
    method: 'get',
    params: data
  })
}


// 签约公司页面查询
export function queryCompany(data) {
  return request({
    url: pre + '/api/crm/contract/queryCompany',
    method: 'post',
    data
  })
}

// 查询项目
export function queryAllProject(data) {
  return request({
    url: pre + '/api/crm/contract/queryAllProject',
    method: 'post',
    data
  })
}

// 生成合同编号
export function getContractNumber(data) {
  return request({
    url: pre + '/api/crm/contract/getContractNumber',
    method: 'post',
    data
  })
}

// 选择企业
export function selectCompany(data) {
  return request({
    url: pre + '/api/crm/contract/selectCompany',
    method: 'post',
    data
  })
}

// 选择企业
export function queryChannelCompany(data) {
  return request({
    url: pre + '/api/crm/contract/queryChannelCompany',
    method: 'post',
    data
  })
}

// 保存合同信息
export function saveContract(data) {
  return requestLoading({
    url: pre + '/api/crm/contract/saveContract',
    method: 'post',
    data
  })
}

// 查询所有合同信息
export function queryAllContract(data) {
  return requestLoading({
    url: pre + '/api/crm/contract/queryAllContract',
    method: 'post',
    data
  })
}

// 批量删除合同
export function batchDeleteContract(data) {
  return requestLoading({
    url: pre + '/api/crm/contract/batchDeleteContract',
    method: 'post',
    data
  })
}

// 删除合同关联订单
export function deleteOrder(data) {
  return requestLoading({
    url: pre + '/api/crm/contract/deleteOrder',
    method: 'post',
    data
  })
}

// 修改合同信息
export function updateContract(data) {
  return requestLoading({
    url: pre + '/api/crm/contract/updateContract',
    method: 'post',
    data
  })
}

// 上传合同文件
export function uploadContractFile(data) {
  return requestLoading({
    url: pre + '/api/crm/contract/uploadContractFile',
    method: 'post',
    data
  })
}

// 选择公海客户企业-下拉列表
export function queryPublicCrmCompany(data) {
  return request({
    url: pre + '/api/crm/contract/queryPublicCrmCompany',
    method: 'post',
    data
  })
}

// 批量修改合同签订人
export function batchEditContractSignUser(data) {
  return requestLoading({
    url: pre + '/api/crm/contract/batchEditContractSignUser',
    method: 'post',
    data
  })
}

// 导出合同列表
export function exportContract(data) {
  return requestLoading({
    url: pre + '/api/crm/contract/exportContract',
    method: 'post',
    data
  })
}

// 保存回款记录
export function savePaymentRecord(data) {
  return requestLoading({
    url: pre + '/api/crm/crmPaymentRecord/savePaymentRecord',
    method: 'post',
    data
  })
}

// 删除回款记录
export function deletePaymentRecord(data) {
  return requestLoading({
    url: pre + '/api/crm/crmPaymentRecord/deletePaymentRecord',
    method: 'get',
    params: data
  })
}

// 查看回款记录
export function queryPaymentRecord(data) {
  return request({
    url: pre + '/api/crm/crmPaymentRecord/queryPaymentRecord',
    method: 'get',
    params: data
  })
}

// 编辑回款记录
export function updatePaymentRecord(data) {
  return requestLoading({
    url: pre + '/api/crm/crmPaymentRecord/updatePaymentRecord',
    method: 'post',
    data
  })
}

// 审核回款记录
export function updateRecheckPaymentRecord(data) {
  return requestLoading({
    url: pre + '/api/crm/crmPaymentRecord/updateRecheckPaymentRecord',
    method: 'post',
    data
  })
}

// 选择客户获取联系人
export function queryPersonnelList(data) {
  return request({
    url: '/crm/api/crm/crmCompanyPersonnel/queryPersonnelList',
    method: 'get',
    params: data
  })
}


// 完成合同处理流程节点
export function contractProcessComplete(data) {
  return request({
    url: pre + '/api/crm/crmContractProcess/contractProcessComplete',
    method: 'post',
    data
  })
}

// 处理合同流程节点初审
export function contractProcessFirstReview(data) {
  return request({
    url: pre + '/api/crm/crmContractProcess/contractProcessFirstReview',
    method: 'post',
    data
  })
}

// 处理合同流程节点复审
export function contractProcessReview(data) {
  return request({
    url: pre + '/api/crm/crmContractProcess/contractProcessReview',
    method: 'post',
    data
  })
}

// 退回合同审批流程
export function sendBackProcess(data) {
  return request({
    url: pre + '/api/crm/crmContractProcess/sendBackProcess',
    method: 'post',
    data
  })
}

// 发起人撤回合同审批流程
export function withdrawProcess(data) {
  return request({
    url: pre + '/api/crm/crmContractProcess/withdrawProcess',
    method: 'post',
    data
  })
}

// 更新环节文件ID串
export function updateFileIds(data) {
  return request({
    url: pre + '/api/crm/crmContractProcess/updateFileIds',
    method: 'post',
    data
  })
}

// 当前环节签收
export function signProcess(data) {
  return request({
    url: pre + '/api/crm/crmContractProcess/signProcess',
    method: 'post',
    data
  })
}

// 环节取回
export function retrieveProcess(data) {
  return request({
    url: pre + '/api/crm/crmContractProcess/retrieveProcess',
    method: 'post',
    data
  })
}

// 删除收款记录
export function deleteAgreement(data) {
  return requestLoading({
    url: pre + '/api/crm/contract/deleteAgreement',
    method: 'get',
    params: data
  })
}

// 查询回款方式
export function queryPaymentMode(data) {
  return request({
    url:'/crm/api/crm/crmPaymentRecord/queryPaymentMode',
    method: 'get',
    params: data
  })
}

// 根据企业ID和项目ID检查是否重复录入(返回值:0::没有重复,1::重复)
export function checkCompanyAndProjectIsRepetition(data) {
  return request({
    url: pre + '/api/crm/contract/checkCompanyAndProjectIsRepetition',
    method: 'post',
    data
  })
}
