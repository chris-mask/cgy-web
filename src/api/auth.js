/**
 * Created by lqysg on 2018/7/26.
 */
import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

/**
 * 获取用户权限菜单
 */
export function getUserAuthMenu() {
  return request({
    url: '/auth/get-user-resource-list/',
    method: 'get'
  })
}

/**
 * 获取全部权限菜单
 */
export function getAllAuthMenu() {
  return request({
    url: '/auth/all-resources-for-api/',
    method: 'get'
  })
}

/**
 * 保存权限菜单
 */
export function saveMenuResource(data) {
  return requestLoading({
    url: '/auth/save-resource-api/',
    method: 'post',
    data
  })
}

/**
 * 获取单个权限菜单项
 */
export function getMenuResource(query) {
  return request({
    url: '/auth/get-resource-api/',
    method: 'get',
    params: query
  })
}

/**
 * 删除权限菜单项
 */
export function delMenuItem(data) {
  return requestLoading({
    url: '/auth/delete-resource-api/',
    method: 'post',
    data
  })
}

