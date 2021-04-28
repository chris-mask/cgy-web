import request from '@/utils/request'

// 首页-我的事项
export function getIndexMatterElement(data) {
  return request({
    url: '/manage/api/manage/matter/getIndexMatterElement',
    method: 'get',
    params: data
  })
}

//首页-三个图表
export function getIndexProjectData(data) {
  return request({
    url: '/manage/api/manage/project/getIndexProjectData',
    method: 'get',
    params: data
  })
}


//内部--首页--获取销售跟进数据
export function querySalePlanIndexCount(data) {
  return request({
    url: '/crm/api/crm/crmSalePlan/querySalePlanIndexCount',
    method: 'get',
    params: data
  })
}

// 首页回款情况面板
export function queryPayBackBoardData(data) {
  return request({
    url: '/crm/api/crm/BoardData/queryPayBackBoardData',
    method: 'post',
    data
  })
}

//内部--首页--我的事项
export function queryMsgChatIndexCount(data) {
  return request({
    url: '/message/api/message/msgChat/queryMsgChatIndexCount',
    method: 'get',
    params: data
  })
}

//内部--首页--综合看板
export function backgroundBoardData(data) {
  return request({
    url: '/crm/api/crm/BoardData/backgroundBoardData',
    method: 'post',
    data
  })
}

//内部--首页--跳转--我的订单--类型接口

// ** 已立项 **  //
export function queryAlreadyApprovalOrderIdList(data) {
  return request({
    url: '/crm/api/crm/BoardData/queryAlreadyApprovalOrderIdList',
    method: 'post',
    data
  })
}

// ** 获取我的待办订单ID集合 **  //
export function queryMyAgendaOrderIdList(data) {
  return request({
    url: '/crm/api/crm/BoardData/queryMyAgendaOrderIdList',
    method: 'post',
    data
  })
}

// ** 马上截止 **  //
export function queryImmediatelyStopOrderIdList(data) {
  return request({
    url: '/crm/api/crm/BoardData/queryImmediatelyStopOrderIdList',
    method: 'post',
    data
  })
}

// ** 待评估 **  //
export function queryStayAssessOrderIdList(data) {
  return request({
    url: '/crm/api/crm/BoardData/queryStayAssessOrderIdList',
    method: 'post',
    data
  })
}

// ** 待审核 **  //
export function queryToAuditOrderIdList(data) {
  return request({
    url: '/crm/api/crm/BoardData/queryToAuditOrderIdList',
    method: 'post',
    data
  })
}

// ** 已回款 **  //
export function queryPayBackContractIdList(data) {
  return request({
    url: '/crm/api/crm/BoardData/queryPayBackContractIdList',
    method: 'post',
    data
  })
}

// ** 待完成 **  //
export function queryToBeCompletedOrderIdList(data) {
  return request({
    url: '/crm/api/crm/BoardData/queryToBeCompletedOrderIdList',
    method: 'post',
    data
  })
}

// ** 待提交 **  //
export function queryToSubmitOrderIdList(data) {
  return request({
    url: '/crm/api/crm/BoardData/queryToSubmitOrderIdList',
    method: 'post',
    data
  })
}

// ** 未分配 **  //
export function querynotAllocationOrderIdList(data) {
  return request({
    url: '/crm/api/crm/BoardData/querynotAllocationOrderIdList',
    method: 'post',
    data
  })
}

// ** 获取待审核合同ID集合 **  //
export function queryRecheckcontractIdList(data) {
  return request({
    url: '/crm/api/crm/BoardData/queryRecheckcontractIdList',
    method: 'post',
    data
  })
}
