import request from '@/utils/request';
import requestLoading from '@/utils/requestLoading'

// 新建字典
export function addDict(data) {
  return requestLoading({
    url: '/center/dict/user/addDict',
    method: 'post',
    data
  })
}

// 删除字典
export function deleteDict(data) {
  return requestLoading({
    url: '/center/dict/user/deleteDict',
    method: 'get',
    params: data
  })
}

// 编辑字典
export function editDict(data) {
  return requestLoading({
    url: '/center/dict/user/editDict',
    method: 'post',
    data
  })
}

// 上升或者下降操作
export function goUpOrDownAssets(data) {
  return request({
    url: '/center/dict/user/goUpOrDown',
    method: 'post',
    data
  })
}

// 查询字典详情
export function queryDictInfo(data) {
  return request({
    url: '/center/dict/user/queryDictInfo',
    method: 'get',
    params: data
  })
}

// 获取字典列表
export function queryDictInfoList(data) {
  return request({
    url: '/center/dict/user/queryDictInfoList',
    method: 'post',
    data
  })
}
