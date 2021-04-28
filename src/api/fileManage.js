import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

const pre = '/filelibrary'

// 删除文件接口
export function deleteFile(data) {
  return requestLoading({
    url: pre + '/api/filelibrary/appFile/deleteFile',
    method: 'post',
    data
  })
}

// 根据文件id获取文件详情接口
export function getFileDetail(data) {
  return request({
    url: pre + '/api/filelibrary/appFile/getFileDetail',
    method: 'get',
    params: data
  })
}

// 下载文件接口
export function getFileDownload(data) {
  return requestLoading({
    url: pre + '/api/filelibrary/appFile/getFileDownload',
    method: 'get',
    params: data
  })
}

// 获取文件列表接口
export function getFileList(data) {
  return request({
    url: pre + '/api/filelibrary/appFile/getFileList',
    method: 'post',
    data
  })
}

// 修改文件接口
export function updateFile(data) {
  return requestLoading({
    url: pre + '/api/filelibrary/appFile/updateFile',
    method: 'post',
    data
  })
}

// 上传文件接口（文件管理菜单使用）
export function uploadFile(data) {
  return request({
    url: pre + '/api/filelibrary/appFile/uploadFile',
    method: 'post',
    data
  })
}

/*
  * 文件分类
 */

// 分类管理树形列表
export function folderManagementListTree(data) {
  return request({
    url: pre + '/api/filelibrary/appFolder/folderManagementListTree',
    method: 'post',
    data
  })
}

// 分类管理树形列表（浏览）
export function folderListAndChildTree(data) {
  return request({
    url: pre + '/api/filelibrary/appFolder/folderListAndChildTree',
    method: 'post',
    data
  })
}

// 新建分类接口
export function addCategory(data) {
  return requestLoading({
    url: pre + '/api/filelibrary/appFolder/addCategory',
    method: 'post',
    data
  })
}

// 根据分类id删除分类接口
export function deleteCategory(data) {
  return requestLoading({
    url: pre + '/api/filelibrary/appFolder/deleteCategory',
    method: 'get',
    params: data
  })
}

// 根据分类id查看分类详情接口
export function getCategoryInfo(data) {
  return request({
    url: pre + '/api/filelibrary/appFolder/getCategory',
    method: 'post',
    data
  })
}

// 通过公司id查询分类信息列表
export function getFolderList(data) {
  return request({
    url: pre + '/api/filelibrary/appFolder/getFolderList',
    method: 'post',
    data
  })
}

// 上升或者下降操作
export function goUpOrDown(data) {
  return request({
    url: pre + '/api/filelibrary/appFolder/goUpOrDown',
    method: 'post',
    data
  })
}

// 更新分类接口
export function updateCategory(data) {
  return requestLoading({
    url: pre + '/api/filelibrary/appFolder/updateCategory',
    method: 'post',
    data
  })
}

//获取分类用角色树形列表
export function getCateRoleList(data) {
  return request({
    url: pre + '/api/filelibrary/appFolder/getRoleCompany',
    method: 'get',
    params: data
  })
}

// 更新分类接口
export function ossFileSystem(data) {
  return requestLoading({
    url: pre + '/api/filelibrary/oss/ossFileSystem',
    method: 'post',
    data
  })
}

// 获取分类管理列表或者子列表
export function getFolderListOrChildList(data) {
  return request({
    url: '/filelibrary/api/filelibrary/appFolder/getFolderListOrChildList',
    method: 'post',
    data
  })
}


// 获取分类管理列表或者子列表
export function addFile(data) {
  return request({
    url: '/filelibrary/api/filelibrary/appFile/addFile',
    method: 'post',
    data
  })
}
