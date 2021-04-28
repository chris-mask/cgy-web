import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

const pre = '/crm'

// 查询订单信息
export function queryAllOrder(data) {
  return requestLoading({
    url: pre + '/api/crm/order/queryAllOrder',
    method: 'post',
    data
  })
}

// 查询订单详情
export function queryOrderDetail(data) {
  return requestLoading({
    url: pre + '/api/crm/order/queryOrderDetail',
    method: 'post',
    data
  })
}

// 修改订单详情-包含处理流程节点修改
export function editOrderDetailAndProcess(data) {
  return requestLoading({
    url: pre + '/api/crm/order/editOrderDetailAndProcess',
    method: 'post',
    data
  })
}

function getParam(data){
  let url = '';
  for(var k in data){
    let value = data[k] !==undefined ? data[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
//最终获取带参数的url方法
function newUrl(url, data){
  //看原始url地址中开头是否带?，然后拼接处理好的参数
  return url += (url.indexOf('?') < 0 ? '?' : '') + getParam(data)
}

// 对未分配工程师订单指派工程师并开始处理流程
export function assignOrderEngineer(data) {
  return requestLoading({
    url: pre + '/api/crm/order/assignOrderEngineer',
    method: 'post',
    data
  })
}

// 对未分配工程师订单指派工程师并开始处理流程(订单数量大于1的订单)
export function assignOrderEngineerOfMultiOrderNumber(data) {
  return requestLoading({
    url: pre + '/api/crm/order/assignOrderEngineerOfMultiOrderNumber',
    method: 'post',
    data
  })
}

// 删除已经分配的工程师(订单数量大于1)
export function deleteAssignUserOfMultiOrderNum(data) {
  return requestLoading({
    url: pre + '/api/crm/order/deleteAssignUserOfMultiOrderNum',
    method: 'post',
    data
  })
}

// 查询订单关联工单分配情况
export function queryAllocationInfo(data) {
  return request({
    url: pre + '/api/crm/order/queryAllocationInfo',
    method: 'post',
    data
  })
}

// 从项目库添加免费订单
export function saveFreeOrderOfProject(data) {
  return requestLoading({
    url: pre + '/api/crm/order/saveFreeOrderOfProject',
    method: 'post',
    data
  })
}

// 处理流程节点评估
export function orderProcessFirstReview(data) {
  return request({
    url: pre + '/api/crm/orderprocess/orderProcessFirstReview',
    method: 'post',
    data
  })
}

// 处理流程节点复审
export function orderProcessReview(data) {
  return request({
    url: pre + '/api/crm/orderprocess/orderProcessReview',
    method: 'post',
    data
  })
}

// 上传流程环节文件
export function uploadProcessNodeFile(data) {
  return request({
    url: pre + '/api/crm/orderprocess/uploadProcessNodeFile',
    method: 'post',
    data
  })
}

// 完成处理流程节点
export function orderProcessComplete(data) {
  return request({
    url: pre + '/api/crm/orderprocess/orderProcessComplete',
    method: 'post',
    data
  })
}

// 完成处理流程节点
export function exportOrderList(data) {
  return request({
    url: pre + '/api/crm/order/exportOrderList',
    method: 'post',
    data
  })
}

// 完成处理流程节点
export function editOrderIsRead(data) {
  return request({
    url: pre + '/api/crm/order/editOrderIsRead',
    method: 'post',
    data
  })
}

// 修改订单状态
export function updateOrderState(data) {
  return request({
    url: pre + '/api/crm/order/updateOrderState',
    method: 'post',
    data
  })
}

// 修改订单核算日期状态
export function updateOrderDeductDate(data) {
  return request({
    url: pre + '/api/crm/order/updateOrderDeductDate',
    method: 'post',
    data
  })
}

// 添加评论
export function addprocesscomment(data) {
  return requestLoading({
    url: pre + '/api/crm/processcomment/addprocesscomment',
    method: 'post',
    data
  })
}

// 删除评论
export function deleteprocesscomment(data) {
  return request({
    url: pre + '/api/crm/processcomment/deleteprocesscomment',
    method: 'get',
    params: data
  })
}

// 根据环节ID查询评论
export function queryprocesscomment(data) {
  return request({
    url: pre + '/api/crm/processcomment/queryprocesscomment',
    method: 'get',
    params: data
  })
}

// 修改评论已读状态
export function updateCommentReadStatus(data) {
  return request({
    url: pre + '/api/crm/processcomment/updateCommentReadStatus',
    method: 'get',
    params: data
  })
}

// 资料收集--查询政策通知项目申报材料清单与企业通用附件列表
export function queryApplyMaterialList(data) {
  return request({
    url: '/policy/api/policy/policyApplyMaterialList/queryApplyMaterialList',
    method: 'post',
    data
  })
}

//资料收集--订单中保存项目申报材料
export function saveProjectApplyFile(data) {
  return request({
    url: '/policy/api/policy/crmProjectApplyFile/saveProjectApplyFile',
    method: 'post',
    data
  })
}

//资料收集--查询订单的项目申报材料
export function queryOrderProjectApplyFile(data) {
  return request({
    url: '/policy/api/policy/crmProjectApplyFile/queryOrderProjectApplyFile',
    method: 'post',
    data
  })
}

//资料收集--查询订单的项目申报材料
export function deleteWorkAndProcess(data) {
  return request({
    url: pre + '/api/crm/order/deleteWorkAndProcess',
    method: 'post',
    data
  })
}

//撤回处理环节
export function invalidProcess(data) {
  return request({
    url: pre + '/api/crm/orderprocess/invalidProcess',
    method: 'post',
    data
  })
}

//取回处理环节
export function recaptionProcess(data) {
  return request({
    url: pre + '/api/crm/orderprocess/recaptionProcess',
    method: 'post',
    data
  })
}

//退回处理环节
export function sendbackProcess(data) {
  return request({
    url: pre + '/api/crm/orderprocess/sendbackProcess',
    method: 'post',
    data
  })
}

//查询工单处理进度历史
export function queryBakProcessList(data) {
  return request({
    url: pre + '/api/crm/orderprocess/queryBakProcessList',
    method: 'post',
    data
  })
}


// 获取导出订单字段信息
export function getExcelExportField(data) {
  return request({
    url: pre + '/api/crm/order/getExcelExportField',
    method: 'get',
    params: data
  })
}
