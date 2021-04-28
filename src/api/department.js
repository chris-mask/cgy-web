import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

// 获取切换企业筛选框数据
export function getAllCompanyInfo() {
  return request({
    url: '/center/dept/user/getAllCompanyInfo',
    method: 'get'
  })
}

// 获取分类管理部门树形数据
export function getDepartmentTree(data) {
  return request({
    url: '/center/dept/user/getCompanyDeptTree',
    method: 'post',
    data
  })
}

// 获取部门详细表格数据
export function getDepartmentInfo(data) {
  return request({
    url: '/center/dept/user/getDeptInfoByCompanyId',
    method: 'post',
    data
  })
}

// 新建部门
export function addDept(data) {
  return requestLoading({
    url: '/center/dept/user/addDept',
    method: 'post',
    data
  })
}

// 删除部门
export function deleteDept(params) {
  return requestLoading({
    url: '/center/dept/user/deleteDept',
    method: 'get',
    params
  })
}

// 部门排序升序/降序
export function goUpOrDown(params) {
  return request({
    url: '/center/dept/user/goUpOrDown',
    method: 'get',
    params
  })
}

// 查询部门成员下拉菜单
export function getDepartmentMembers(data) {
  return request({
    url: '/center/dept/user/queryDeptUserSelect',
    method: 'get',
    params: data
  })
}

// 编辑/查看部门详情
export function getDepartmentDetail(data) {
  return request({
    url: '/center/dept/user/queryDeptInfoById',
    method: 'get',
    params: data
  })
}

// 更新部门信息
export function updateDepartment(data) {
  return requestLoading({
    url: '/center/dept/user/updateDept',
    method: 'post',
    data
  })
}

// 用户模块查询其他部门
export function queryOtherDept(data) {
  return request({
    url: '/center/dept/user/queryOtherDept',
    method: 'post',
    data
  })
}
