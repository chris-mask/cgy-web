import request from '@/utils/request';
import requestLoading from '@/utils/requestLoading'

// 获取权限列表
export function getPrivilegesList(data) {
  return request({
    url: '/center/permission/user/queryPermissionInfoList',
    method: 'post',
    data
  })
}

// 查询权限详情
export function getPrivilegesInfo(data) {
  return request({
    url: '/center/permission/user/queryPermissionInfo',
    method: 'get',
    params: data
  })
}

// 编辑权限
export function editPermission(data) {
  return requestLoading({
    url: '/center/permission/user/editPermission',
    method: 'post',
    data
  })
}

// 删除权限
export function deletePermission(data) {
  return requestLoading({
    url: '/center/permission/user/deletePermissionInfo',
    method: 'get',
    params: data
  })
}

// 新建权限
export function addPermission(data) {
  return requestLoading({
    url: '/center/permission/user/addPermission',
    method: 'post',
    data
  })
}

// 上升下降
export function goUpOrDown(data) {
  return request({
    url: '/center/permission/user/goUpOrDown',
    method: 'post',
    data
  })
}
