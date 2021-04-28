import request from '@/utils/request';
import requestLoading from '@/utils/requestLoading'

// 获取角色列表
export function getRolesList(data) {
  return request({
    url: '/center/role/user/queryRole',
    method: 'post',
    data
  })
}

// 新增角色
export function addRole(data) {
  return requestLoading({
    url: '/center/role/user/addRole',
    method: 'post',
    data
  })
}

// 删除角色
export function deleteRole(data) {
  return requestLoading({
    url: '/center/role/user/deleteRole',
    method: 'get',
    params: data
  })
}

// 编辑角色
export function editRole(data) {
  return requestLoading({
    url: '/center/role/user/editRole',
    method: 'post',
    data
  })
}

// 上升或者下降操作
export function goUpOrDown(data) {
  return request({
    url: '/center/role/user/goUpOrDown',
    method: 'post',
    data
  })
}

// 获取公司用户列表
export function queryUserCompany(data) {
  return request({
    url: '/center/role/user/queryUserCompany',
    method: 'post',
    data
  })
}

// 获取数据权限部门列表
export function queryDataPermissions(data) {
  return request({
    url: '/center/role/user/queryDataPermissions',
    method: 'post',
    data
  })
}

// 获取操作权限列表树
export function queryCompanyPermissions(data) {
  return request({
    url: '/center/role/user/queryCompanyPermissions',
    method: 'get',
    params: data
  })
}

// 获取角色详情
export function queryRoleInfoById(data) {
  return request({
    url: '/center/role/user/queryRoleInfoById',
    method: 'get',
    params: data
  })
}


//查询企业端企业管理员权限
export function queryCompanyAdminPermissions(data) {
  return request({
    url: '/center/role/user/queryCompanyAdminPermissions',
    method: 'get',
    params: data
  })
}

// 编辑授权企业
export function editCompanyAdminRole(data) {
  return request({
    url: '/center/role/user/editCompanyAdminRole',
    method: 'post',
    data
  })
}
