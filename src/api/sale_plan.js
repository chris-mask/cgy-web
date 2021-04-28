import request from '@/utils/request'
import requestDownload from '@/utils/requestDownload';
import requestLoading from '@/utils/requestLoading'
/**
 * 获取部门
 * @param query
 * @constructor
 */
export function getCompanyDeptTree(data) {
  return request({
    url: '/center/dept/user/getCompanyDeptTree',
    method: 'post',
    data
  })
}

/**
 * 获取员工
 * @param query
 * @constructor
 */
export function queryUserListByDepts(data) {
  return request({
    url: '/center/system/user/queryUserListByDepts',
    method: 'post',
    data
  })
}

/**
 * 销售计划列表
 * @param query
 * @constructor
 */
export function querySalePlanList(data) {
  return request({
    url: '/crm/api/crm/crmSalePlan/querySalePlanList',
    method: 'post',
    data
  })
}


/**
 * 删除销售计划
 * @param data
 */
export function deleteSalePlanByIds(data) {
  return requestLoading({
    url: '/crm/api/crm/crmSalePlan/deleteSalePlanByIds',
    method: 'post',
    data
  })
}

/**
 * 新增销售计划
 * @param data
 */
export function saveSalePlan(data) {
  return requestLoading({
    url: '/crm/api/crm/crmSalePlan/saveSalePlan',
    method: 'post',
    data
  })
}

/**
 * 变更销售计划
 * @param data
 */
export function updateChangeSalePlan(data) {
  return requestLoading({
    url: '/crm/api/crm/crmSalePlan/updateChangeSalePlan',
    method: 'post',
    data
  })
}

/**
 * 销售计划详情
 * @param query
 * @constructor
 */
export function querySalePlanInfoById(query) {
  return request({
    url: '/crm/api/crm/crmSalePlan/querySalePlanInfoById',
    method: 'get',
    params: query
  })
}

/**
 * 实施销售计划
 * @param data
 */
export function updateExecuteSalePlan(data) {
  return requestLoading({
    url: '/crm/api/crm/crmSalePlan/updateExecuteSalePlan',
    method: 'post',
    data
  })
}

/**
 * 评论销售计划
 * @param data
 */
export function updateAppraiseSalePlan(data) {
  return request({
    url: '/crm/api/crm/crmSalePlan/updateAppraiseSalePlan',
    method: 'post',
    data
  })
}

/**
 * 导入销售计划模板
 * @param query
 * @constructor
 */
export function importSalePlanList(data) {
  return request({
    // url: '/crm/api/crm/crmSalePlan/importSalePlanList',
    url: '/crm/api/crm/sysExcelTask/uploadSalePlanImportFile',
    method: 'post',
    data
  })
}

/**
 * 下载销售计划模板
 * @param query
 * @constructor
 */
export function getSalePlanTemplate(query) {
  return requestLoading({
    url: '/crm/api/crm/crmSalePlan/getSalePlanTemplate',
    method: 'get',
    params: query
  })
}

/**
 * 下载模板
 * @param query
 * @constructor
 */
export function downloadTemplate(data) {
  return requestDownload({
    url: '/crm/api/download/common/download',
    method: 'get',
    params: data,
    responseType: 'blob',
  })
}

/**
 * 导出销售计划列表
 * @param query
 * @constructor
 */
export function exportSalePlanList(data) {
  return requestLoading({
    url: '/crm/api/crm/crmSalePlan/exportSalePlanList',
    method: 'post',
    data
  })
}


/**
 * 目标客户列表查询
 * @param query
 * @constructor
 */
export function queryCrmCompanyInfoByCommon(data) {
  return request({
    url: '/crm/api/crm/crmCompany/queryCrmCompanyInfoByCommon',
    method: 'post',
    data
  })
}


/**
 * 查询项目
 * @param query
 * @constructor
 */
export function queryAllProjectBySalePlan(data) {
  return request({
    url: 'policy/api/policy/policyProject/queryAllProjectBySalePlan',
    method: 'post',
    data
  })
}

/**
 * 条件查询销售计划列表
 * @param query
 * @constructor
 */
export function querySalePlanListByEnterpriseDimension(data) {
  return request({
    url: 'crm/api/crm/crmSalePlan/querySalePlanListByEnterpriseDimension',
    method: 'post',
    data
  })
}

/**
 * 批量新增销售计划
 * @param query
 * @constructor
 */
export function saveSalePlanBatch(data) {
  return request({
    url: 'crm/api/crm/crmSalePlan/saveSalePlanBatch',
    method: 'post',
    data
  })
}


/**
 * 查询销售计划统计表
 * @param query
 * @constructor
 */
export function querySalePlanTable(data) {
  return request({
    url: 'crm/api/crm/crmSalePlan/querySalePlanTable',
    method: 'post',
    data
  })
}


/**
 * 导出销售计划统计表
 * @param query
 * @constructor
 */
export function exportSalePlanTable(data) {
  return request({
    url: 'crm/api/crm/crmSalePlan/exportSalePlanTable',
    method: 'post',
    data
  })
}


 