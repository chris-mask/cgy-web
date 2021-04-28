import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

const pre = '/crm'




// 新增客户企业信息
export function saveCrmCompanyInfo(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/saveCrmCompanyInfo',
    method: 'post',
    data
  })
}

// 删除客户企业信息
export function deleteCrmCompanyInfo(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/deleteCrmCompanyInfo',
    method: 'get',
    params: data
  })
}

// 查询客户企业信息
export function queryCrmCompanyInfo(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/queryCrmCompanyInfo',
    method: 'post',
    data
  })
}

// 修改客户企业信息
export function updateCrmCompanyInfo(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/updateCrmCompanyInfo',
    method: 'post',
    data
  })
}

// 批量修改客户企业跟进人员
export function batchFollowUser(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/batchFollowUser',
    method: 'post',
    data
  })
}

// 获取指定角色用户列表
export function queryUserComboInfo(data) {
  return request({
    url: pre + '/api/crm/crmCompany/queryUserComboInfo',
    method: 'post',
    data
  })
}

// 查询内部企业-下拉列表
export function querySignCompanyList(data) {
  return request({
    url: pre + '/api/crm/crmCompany/querySignCompanyList',
    method: 'get',
    params: data
  })
}

// 查询客户详情-合同信息
export function queryCompanyDetailContractInfo(data) {
  return request({
    url: pre + '/api/crm/crmCompany/queryCompanyDetailContractInfo',
    method: 'get',
    params: data
  })
}

// 客户详情-订单信息
export function queryCompanyDetailOrderInfo(data) {
  return request({
    url: pre + '/api/crm/crmCompany/queryCompanyDetailOrderInfo',
    method: 'get',
    params: data
  })
}

// 查询客户详情-立项信息
export function queryCompanyDetailApprovalListInfo(data) {
  return request({
    url: pre + '/api/crm/crmCompany/queryCompanyDetailApprovalListInfo',
    method: 'get',
    params: data
  })
}

// 投入公海
export function putCompanyToFreeSea(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/putCompanyToFreeSea',
    method: 'post',
    data
  })
}

// 设置/取消客户企业是否渠道商
export function updateCrmCompanyIsProxy(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/updateCrmCompanyIsProxy',
    method: 'post',
    data
  })
}

// 客户中心批量新增销售计划联系人信息回显
export function queryCompanyContactInfo(data) {
  return request({
    url: pre + '/api/crm/crmCompany/queryCompanyContactInfo',
    method: 'post',
    data
  })
}

// 检查信用代码是否存在::已存在返回true,不存在返回false
export function checkCompnayCodeExist(data) {
  return request({
    url: pre + '/api/crm/crmCompany/checkCompnayCodeExist',
    method: 'get',
    params: data
  })
}

//导出客户企业信息列表
export function exportCrmCompanyInfo(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/exportCrmCompanyInfo',
    method: 'post',
    data
  })
}

// 获取导入客户信息模板
export function getCrmCompanyInfoTemplate(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/getCrmCompanyInfoTemplate',
    method: 'get',
    params: data
  })
}

//导入客户信息列表
export function importCrmCompanyInfoList(data) {
  return request({
    // url: pre + '/api/crm/crmCompany/importCrmCompanyInfoList',
    url: pre + '/api/crm/sysExcelTask/uploadCrmCompanyImportFile',
    method: 'post',
    data
  })
}

//抢客户
export function batchGrabCompany(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/batchGrabCompany',
    method: 'post',
    data
  })
}

//修改客户企业人员统计
export function updateCrmCompanyPersonnelStatistics(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/updateCrmCompanyPersonnelStatistics',
    method: 'post',
    data
  })
}


//客户综合信息表
export function createCompanyComplexInfo(data) {
  return request({
    url: pre + '/api/crm/crmCompany/createCompanyComplexInfo',
    method: 'get',
    params: data
  })
}

// 查询客户跟踪人员历史信息
export function queryCrmCompanyFollowHistory(data) {
  return request({
    url: pre + '/api/crm/crmCompany/queryCrmCompanyFollowHistory',
    method: 'get',
    params: data
  })
}


//查询项目申报材料
export function queryProjectApplyFile(data) {
  return request({
    url: '/policy/api/policy/crmProjectApplyFile/queryProjectApplyFile',
    method: 'post',
    data
  })
}

//删除项目申报材料
export function deleteProjectApplyFileIds(data) {
  return request({
    url: '/policy/api/policy/crmProjectApplyFile/deleteProjectApplyFileIds',
    method: 'post',
    data
  })
}

//编辑项目申报材料
export function updateProjectApplyFile(data) {
  return request({
    url: '/policy/api/policy/crmProjectApplyFile/updateProjectApplyFile',
    method: 'post',
    data
  })
}

//下载文件接口
export function ossFileDownload(data) {
  return request({
    url: '/filelibrary/api/filelibrary/oss/ossFileSystemFileDownload',
    method: 'post',
    data
  })
}


//查询某个订单的某个附件分类模板
export function getOrderApplyMaterialListInfo(data) {
  return request({
    url: '/policy/api/policy/policyApplyMaterialList/getOrderApplyMaterialListInfo',
    method: 'get',
    params: data
  })
}

//订单中--保存项目申报材料
export function saveProjectApplyFile(data) {
  return request({
    url: '/policy/api/policy/crmProjectApplyFile/saveProjectApplyFile',
    method: 'get',
    params: data
  })
}

//新增企业联系人
export function saveCrmCompanyPersonnel(data) {
  return request({
    url: '/crm/api/crm/crmCompanyPersonnel/saveCrmCompanyPersonnel',
    method: 'post',
    data
  })
}

//查询企业联系人
export function queryCrmCompanyPersonnelList(data) {
  return request({
    url: '/crm/api/crm/crmCompanyPersonnel/queryCrmCompanyPersonnelList',
    method: 'post',
    data
  })
}

//查询企业联系人
export function updateCrmCompanyPersonnel(data) {
  return request({
    url: '/crm/api/crm/crmCompanyPersonnel/updateCrmCompanyPersonnel',
    method: 'post',
    data
  })
}

//批量删除企业联系人
export function delCrmCompanyPersonnelByIds(data) {
  return request({
    url: '/crm/api/crm/crmCompanyPersonnel/delCrmCompanyPersonnelByIds',
    method: 'post',
    data
  })
}

//批量删除企业联系人
export function queryCompanyOrderList(data) {
  return request({
    url: '/policy/api/policy/crmProjectApplyFile/queryCompanyOrderList',
    method: 'post',
    data
  })
}

//导出客户详情-立项信息
export function exportCompanyDetailApprovalListInfo(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/exportCompanyDetailApprovalListInfo',
    method: 'post',
    data
  })
}

//导出企业联系人
export function exportCrmCompanyPersonnelList(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/exportCrmCompanyPersonnelList',
    method: 'get',
    params: data
  })
}

//导出订单列表
export function exportCompanyDetailOrderInfo(data) {
  return requestLoading({
    url: pre + '/api/crm/crmCompany/exportCompanyDetailOrderInfo',
    method: 'get',
    params: data
  })
}

//企业信息图文显示项目申报情况
export function queryCompanyProjectDeclare(data) {
  return request({
    url: '/policy/api/policy/policyProject/queryCompanyProjectDeclare',
    method: 'get',
    params: data
  })
}

//企业信息图文-项目简略信息
export function queryProjectDeclareInfo(data) {
  return request({
    url: '/policy/api/policy/policyProject/queryProjectDeclareInfo',
    method: 'get',
    params: data
  })
}

//企业信息图文-项目相关政策
export function queryProjectRelatedPolicy(data) {
  return request({
    url: '/policy/api/policy/policyProject/queryProjectRelatedPolicy',
    method: 'get',
    params: data
  })
}

//查询已报项目信息
export function queryYiBaoProjectInfo(data) {
  return request({
    url: pre + '/api/crm/order/queryYiBaoProjectInfo',
    method: 'get',
    params: data
  })
}

//设为已报 - 新增立项
export function addPolicyApprovalSetReported(data) {
  return request({
    url: '/policy/api/policy/policyApprovalList/addPolicyApprovalSetReported',
    method: 'post',
    data
  })
}

//获取导出企业字段信息
export function getExcelExportField(data) {
  return request({
    url: pre + '/api/crm/crmCompany/getExcelExportField',
    method: 'get',
    params: data
  })
}
