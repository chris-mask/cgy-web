import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'


// 查询咨询消息
export function queryLeaveMessage(data) {
  return request({
    url: '/message/api/message/msgLeaveMessage/leaveMessageList',
    method: 'post',
    data
  })
}

// 处理咨询消息
export function handleLeaveMessage(data) {
  return request({
    url: '/message/api/message/msgLeaveMessage/dealLeaveMessage',
    method: 'post',
    data
  })
}

