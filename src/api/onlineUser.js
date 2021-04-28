import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'


// 查询在线人数列表
export function queryOnlineUserList(data) {
  return request({
    url: '/message/api/portalpublic/socket/queryUserOnlineCount',
    method: 'get',
    params: data
  })
}
