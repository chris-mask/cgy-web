import request from '@/utils/request'
import requestDownload from '@/utils/requestDownload';
import requestLoading from '@/utils/requestLoading'

// 查询用户操作说明
export function queryOperationExplain(data) {
  return request({
    url: '/center/api/user/sysOperationExplain/queryOperationExplain',
    method: 'post',
    data
  })
}

// 获取数据库表名称和表注释
export function getTableList(query) {
  return request({
    url: '/center/api/user/sysOperationExplain/getTableList',
    method: 'get',
    params: query
  })
}

// 获取数据库表名称和表注释
export function getTableColumnInfo(query) {
  return request({
    url: '/policy/api/policy/policyApplyCondition/getTableColumnInfo',
    method: 'get',
    params: query
  })
}


// 查询用户操作说明
export function saveOperationExplain(data) {
  return request({
    url: '/center/api/user/sysOperationExplain/saveOperationExplain',
    method: 'post',
    data
  })
}

// 修改用户操作说明
export function updateOperationExplain(data) {
  return request({
    url: '/center/api/user/sysOperationExplain/updateOperationExplain',
    method: 'post',
    data
  })
}

// 获取菜单信息
export function getPermissionList(query) {
  return request({
    url: '/center/api/user/sysOperationExplain/getPermissionList',
    method: 'get',
    params: query
  })
}

// 删除用户操作说明
export function removeOperationExplain(query) {
  return request({
    url: '/center/api/user/sysOperationExplain/removeOperationExplain',
    method: 'get',
    params: query
  })
}


//获取表字段说明
export function getOperationExplainByTable(query) {
  return request({
    url: '/center/api/user/sysOperationExplain/getOperationExplainByTable',
    method: 'get',
    params: query
  })
}

//获取页面按钮说明
export function getOperationExplainByUrl(query) {
  return request({
    url: '/center/api/user/sysOperationExplain/getOperationExplainByUrl',
    method: 'get',
    params: query
  })
}





