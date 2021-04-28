import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

//查询聊天人列表
export function queryChatList(data) {
  return request({
    url: '/message/api/message/msgChat/queryChatList',
    method: 'POST',
    data
  })
}

//置顶/取消置顶 聊天
export function updateChatPinOrUnpin(data) {
  return request({
    url: '/message/api/message/msgChat/updateChatPinOrUnpin',
    method: 'POST',
    data
  })
}

//查询聊天内容列表
export function queryMessageList(data) {
  return request({
    url: '/message/api/message/msgChat/queryMessageList',
    method: 'post',
    data
  })
}



//查询留言列表
export function queryContactUsList(data) {
  return request({
    url: '/message/api/message/msgChat/queryContactUsList',
    method: 'post',
    data
  })
}

//处理留言
export function updateContactUs(data) {
  return request({
    url: '/message/api/message/msgChat/updateContactUs',
    method: 'post',
    data
  })
}

//查询订单进度跟踪列表
export function queryOrderMsgRemindList(data) {
  return request({
    url: '/message/api/message/msgRemind/queryOrderMsgRemindList',
    method: 'post',
    data
  })
}

 



//发送聊天
export function addChat(data) {
  return request({
    url: '/message/api/message/msgChat/addChat',
    method: 'post',
    data
  })
}

//删除聊天
export function deleteChatById(query) {
  return requestLoading({
    url: '/message/api/message/msgChat/deleteChatById',
    method: 'get',
    params: query
  })
}


//上传聊天文件
export function addChatFile(data) {
  return request({
    url: '/message/api/message/msgChat/addChatFile',
    method: 'post',
    data
  })
}

// export function addChatFile(query) {
//   return request({
//     url: '/message/api/message/msgChat/addChatFile',
//     method: 'get',
//     params: query
//   })
// }


// ---------------------------------
//查询提醒列表
export function queryMsgRemindList(data) {
  return request({
    url: '/message/api/message/msgRemind/queryMsgRemindList',
    method: 'post',
    data
  })
}

//提醒列表全部标记已读
export function updateMsgRemindMarkRead(data) {
  return request({
    url: '/message/api/message/msgRemind/updateMsgRemindMarkRead',
    method: 'post',
    data
  })
}

//查询提醒详情信息
export function queryMsgRemindById(query) {
  return request({
    url: '/message/api/message/msgRemind/queryMsgRemindById',
    method: 'get',
    params: query
  })
}

//查询短信发送记录列表
export function queryMsgSmsSendList(data) {
  return request({
    url: '/message/api/message/msgSmsSend/queryMsgSmsSendList',
    method: 'post',
    data
  })
}

//通过发送记录id获取接收详情列表
export function queryMsgSmsReceiveList(data) {
  return request({
    url: '/message/api/message/msgSmsReceive/queryMsgSmsReceiveList',
    method: 'post',
    data
  })
}

//查询短信通知模板列表
export function queryMsgSmsTemplateList(query) {
  return request({
    url: '/message/api/message/msgSmsSend/queryMsgSmsTemplateList',
    method: 'get',
    params: query
  })
}

//新增短信记录
export function addMsgSmsSend(data) {
  return requestLoading({
    url: '/message/api/message/msgSmsSend/addMsgSmsSend',
    method: 'post',
    data
  })
}

//查询该企业是否可以发短信
export function queryCompanyCanSend(query) {
  return request({
    url: '/message/api/message/msgSmsSend/queryCompanyCanSend',
    method: 'get',
    params: query
  })
}

//导入客户联系人
export function importCrmCompanyPersonnel(data) {
  return requestLoading({
    url: '/crm/api/crm/crmCompany/importCrmCompanyPersonnel',
    method: 'post',
    data
  })
}

//查询该企业是否可以发短信
export function getCrmCompanyPersonnelTemplate() {
  return request({
    url: '/crm/api/crm/crmCompany/getCrmCompanyPersonnelTemplate',
    method: 'get',
  })
}

/**
 * 敏感词检测
 *
 * @param data
 */
export function filterSensitiveWords(query) {
  return request({
    url: '/message/api/portalpublic/contact/filterSensitiveWords',
    method: 'get',
    params: query
  })
}

