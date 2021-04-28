import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

const pre = '/policy'

// 查询政策通知记录
export function queryNoticeInfo(data) {
  return requestLoading({
    url: pre + '/api/policy/policyNoticeInfo/queryNoticeInfo',
    method: 'post',
    data
  })
}

// 修改政策通知记录
export function editNoticeInfo(data) {
  return requestLoading({
    url: pre + '/api/policy/policyNoticeInfo/editNoticeInfo',
    method: 'post',
    data
  })
}

// 新增政策通知记录
export function saveNoticeInfo(data) {
  return requestLoading({
    url: pre + '/api/policy/policyNoticeInfo/saveNoticeInfo',
    method: 'post',
    data
  })
}

// 删除政策通知记录
export function removeNoticeInfo(data) {
  return requestLoading({
    url: pre + '/api/policy/policyNoticeInfo/removeNoticeInfo',
    method: 'get',
    params: data
  })
}

// 上传富文本编辑器文件
export function uploadRichTextFile(data) {
  return requestLoading({
    url: pre + '/api/policy/policyNoticeInfo/uploadRichTextFile',
    method: 'get',
    params: data
  })
}

// 查询项目信息
export function queryProjectInfo(data) {
  return request({
    url: pre + '/api/policy/policyNoticeInfo/queryProjectInfo',
    method: 'post',
    data
  })
}

// 上传文件
export function uploadFile(data) {
  return requestLoading({
    url: pre + '/api/policy/policyNoticeInfo/uploadFile',
    method: 'post',
    data
  })
}

// 取消文件关联
export function dissociatedFile(data) {
  return request({
    url: pre + '/api/policy/policyNoticeInfo/dissociatedFile',
    method: 'get',
    params: data
  })
}

//获取系统变量列表
export function getSystemVarList(data) {
  return request({
    url: pre + '/api/policy/policyApplyCondition/getSystemVarList',
    method: 'get',
    params: data
  })
}

//获取表分类信息
export function getTableType(data) {
  return request({
    url: pre + '/api/policy/policyApplyCondition/getTableType',
    method: 'get',
    params: data
  })
}

//获取通过表分类获取表名称信息
export function getTableNameInfoListByType(data) {
  return request({
    url: pre + '/api/policy/policyApplyCondition/getTableNameInfoListByType',
    method: 'get',
    params: data
  })
}

export function getTableColumnInfo(data) {
  return request({
    url: pre + '/api/policy/policyApplyCondition/getTableColumnInfo',
    method: 'get',
    params: data
  })
}

//复制
export function copyNoticeInfo(data) {
  return request({
    url: pre + '/api/policy/policyNoticeInfo/copyNoticeInfo',
    method: 'get',
    params: data
  })
}


// 获取条件常用表达式列表
export function getConstantDataList(data) {
  return request({
    url: pre + '/api/policy/policyApplyCondition/getConstantList',
    method: 'get',
    params: data
  })
}

// 获取选择政策项目条件的列表
export function getNoticeProjectConditions(data) {
  return request({
    url: pre + '/api/policy/policyApplyCondition/getNoticeProjectConditions',
    method: 'get',
    params: data
  })
}




// 查询联系方式列表
export function queryContactList(data) {
  return request({
    url: pre + '/api/policy/customercontact/queryContactList',
    method: 'post',
    data
  })
}


// 查询联系方式列表
export function updateContact(data) {
  return request({
    url: pre + '/api/policy/customercontact/updateContact',
    method: 'post',
    data
  })
}

/**
 * 发送微信公众号模板消息
 * @param data
 */
export function sendWxMpTemplateMsg(data) {
  return request({
    url: pre + '/api/policy/policyWxMsg/sendWxMpTemplateMsg',
    method: 'post',
    data
  })
}

/**
 * 获取已添加至微信公众号帐号下所有模板列表
 * @param data
 */
export function getWxMpAllPrivateTemplate(data) {
  return request({
    url: pre + '/api/policy/policyWxMsg/getWxMpAllPrivateTemplate',
    method: 'get',
    params: data
  })
}

/**
 * 新增微信公众号模板消息
 * @param data
 */
export function addWxMpTemplateMsg(data) {
  return request({
    url: pre + '/api/policy/policyWxMsg/addWxMpTemplateMsg',
    method: 'post',
    data
  })
}
