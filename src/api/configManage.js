import request from '@/utils/request';
import requestLoading from '@/utils/requestLoading'

// 新建配置
export function addDict(data) {
  return requestLoading({
    url: '/center/conf/user/addConf',
    method: 'post',
    data
  })
}

// 删除配置
export function deleteDict(data) {
  return requestLoading({
    url: '/center/conf/user/deleteConf',
    method: 'get',
    params: data
  })
}

// 编辑配置
export function editDict(data) {
  return requestLoading({
    url: '/center/conf/user/editConf',
    method: 'post',
    data
  })
}

// 上升或者下降操作
export function goUpOrDownAssets(data) {
  return request({
    url: '/center/conf/user/goUpOrDown',
    method: 'post',
    data
  })
}

// 查询配置详情
export function queryDictInfo(data) {
  return request({
    url: '/center/conf/user/queryConfInfo',
    method: 'get',
    params: data
  })
}

// 获取配置列表
export function queryConfInfoList(data) {
  return request({
    url: '/center/conf/user/queryConfInfoList',
    method: 'post',
    data
  })
}
