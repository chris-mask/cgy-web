import request from '@/utils/request'
import requestDownload from '@/utils/requestDownload';

/**
 * 条件查询项目申报列表
 * @param query
 * @constructor
 */
export function queryProjectApplyList(data) {
  return request({
    url: '/crm/api/crm/projectApply/queryProjectApplyList',
    method: 'post',
    data
  })
}

/**
 * 新增项目申报
 * @param query
 * @constructor
 */
export function saveProjectApply(data) {
  return requestDownload({
    url: '/crm/api/crm/projectApply/saveProjectApply',
    method: 'post',
    data
  })
}

/**
 * 编辑项目申报
 * @param query
 * @constructor
 */
export function updateProjectApply(data) {
  return requestDownload({
    url: '/crm/api/crm/projectApply/updateProjectApply',
    method: 'post',
    data
  })
}

/**
 * 查询项目申报详情
 * @param query
 * @constructor
 */
export function queryProjectApplyDetailById(query) {
  return request({
    url: '/crm/api/crm/projectApply/queryProjectApplyDetailById',
    method: 'get',
    params: query
  })
}

/**
 * 导出项目申报列表
 * @param data
 */
export function exportProjectApplyList(data) {
  return requestDownload({
    url: '/crm/api/crm/projectApply/exportProjectApplyList',
    method: 'post',
    data
  })
}

/**
 * 删除项目申报记录
 * @param data
 */
export function deleteProjectApplyByIds(data) {
  return requestDownload({
    url: '/crm/api/crm/projectApply/deleteProjectApplyByIds',
    method: 'post',
    data
  })
}

/**
 * 申报资料批量文件上传
 * @param data
 */
export function batchDeclareDataFileUpload(data) {
  return requestDownload({
    url: '/crm/api/crm/projectApply/batchDeclareDataFileUpload',
    method: 'post',
    data
  })
}

/**
 * 新增项目申报进度
 * @param data
 */
export function saveProjectApplyProcess(data) {
  return requestDownload({
    url: '/crm/api/crm/applyProcess/saveProjectApplyProcess',
    method: 'post',
    data
  })
}

/**
 * 编辑项目申报进度
 * @param data
 */
export function updateProjectApplyProcess(data) {
  return requestDownload({
    url: '/crm/api/crm/applyProcess/updateProjectApplyProcess',
    method: 'post',
    data
  })
}

/**
 * 查询项目申报进度详情
 * @param data
 */
export function queryProjectApplyProcessDetailById(data) {
  return request({
    url: '/crm/api/crm/applyProcess/queryProjectApplyProcessDetailById',
    method: 'get',
    params: query
  })
}

/**
 * 删除项目申报进度记录[批量]
 * @param data
 */
export function deleteProjectApplyProcessByIds(data) {
  return requestDownload({
    url: '/crm/api/crm/applyProcess/deleteProjectApplyProcessByIds',
    method: 'post',
    data
  })
}




