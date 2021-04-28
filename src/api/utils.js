// import request from '@/utils/commonRequest'
import requestDownload from '@/utils/requestDownload';
import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

// 通用下载接口 - Policy
export function downloadPolicy(params) {
  return requestDownload({
    url: '/policy/api/download/common/download',
    method: 'get',
    responseType: 'blob',
    params: params
  })
}

// 通用下载接口 - development
export function downloadDevelopment(params) {
  return requestDownload({
    url: '/development/api/download/common/download',
    method: 'get',
    responseType: 'blob',
    params: params
  })
}

// 通用下载接口 - crm
export function downloadCrm(params) {
  return requestDownload({
    url: '/crm/api/download/common/download',
    method: 'get',
    responseType: 'blob',
    params: params
  })
}

// 获取秘钥
export function getSecretKey(data) {
  return request({
    url: '/center/auth-controller/user/getSecretKey',
    method: 'get',
    params: data
  })
}

//查询通用相关字典
export function commonDict(data) {
  return request({
    url: '/center/api/download/commonDict',
    method: 'get',
    params: data
  })
}

//根据项目名称获取用户参与过的项目名称下拉框列表（含作为负责人或参与人）
export function getProjectsByUsersParticipate(data) {
  return request({
    url: '/manage/api/manage/project/getProjectsByUsersParticipate',
    method: 'post',
    data
  })
}

// 根据用户id获取用户参与过的产品列表（含作为负责人或参与人）
export function getProductsByUsersParticipate(data) {
  return request({
    url: '/manage/api/manage/product/getProductsByUsersParticipate',
    method: 'post',
    data
  })
}

// 获取公共用户列表
export function queryUserList(data) {
  return request({
    url: '/center/system/user/queryUserList',
    method: 'post',
    data
  })
}

// 查询角色用户
export function queryUserRoleByCompanyId(data) {
  return request({
    url: '/center/api/download/queryUserRoleByCompanyId',
    method: 'get',
    params: data
  })
}

//获取是否加密和加密白名单
export function getEncryptInfo(data) {
  return request({
    url: '/center/encrypt/user/getEncryptInfo',
    method: 'get',
    params: data
  })
}

// 上传文件接口 -阿里云
export function uploadRichTextFile(data) {
  return request({
    url: '/manage/api/manage/rich/uploadRichTextFile',
    method: 'post',
    data
  })
}

// 生成邀请码
export function generateInviteCode(data) {
  return request({
    url: '/center/invite/user/generateInviteCode',
    method: 'post',
    data
  })
}

// 查询邀请记录信息
export function getinviteinfo(data) {
  return request({
    url: '/center/system/free-user/getinviteinfo',
    method: 'get',
    params: data
  })
}

// 获取邀请用户绑定手机号验证码-加入企业
export function getInviteUserPhoneValidCode(data) {
  return request({
    url: '/center/system/free-user/getInviteUserPhoneValidCode',
    method: 'get',
    params: data
  })
}

// 邀请用户加入企业
export function inviteUserAddCompany(data) {
  return request({
    url: '/center/system/free-user/inviteUserAddCompany',
    method: 'post',
    data
  })
}

// 查询地区信息相关字典 level从3开始递减至0结束
export function commonDictOfRegion(data) {
  return request({
    url: '/center/api/download/commonDictOfRegion',
    method: 'get',
    params: data
  })
}

// 根据字典记录ID获取字典名称
export function commonDictGetNameByCaChe(data) {
  return request({
    url: '/center/api/download/commonDictGetNameByCaChe',
    method: 'get',
    params: data
  })
}

//根据文件id批量获取文件详情列表接口
export function getFileListWithFileIds(data) {
  return request({
    url: '/filelibrary/api/filelibrary/appFile/getFileListWithFileIds',
    method: 'post',
    data
  })
}


//根据角色查询用户
export function queryUserInfoRole(data) {
  return request({
    url: '/center/system/user/queryUserInfoRole',
    method: 'post',
    data
  })
}

//批量同步企业信息
export function batchQueryCompanyInfoFromQichacha(data) {
  return request({
    url: '/crm/api/crm/qichacha/batchQueryCompanyInfoFromQichacha',
    method: 'post',
    data
  })
}

//新增企业前同步企业信息回显接口
export function queryCompanyInfoFromQichacha(data) {
  return request({
    url: '/crm/api/crm/qichacha/queryCompanyInfoFromQichacha',
    method: 'post',
    data
  })
}

//下载文件接口
export function ossFileSystemFileDownload(data) {
  return request({
    url: '/filelibrary/api/filelibrary/oss/ossFileSystemFileDownload',
    method: 'post',
    data
  })
}

//批量同步知识产权接口
export function batchQueryIntellectualPropertyRights(data) {
  return request({
    url: '/crm/api/crm/qichacha/batchQueryIntellectualPropertyRights',
    method: 'post',
    data
  })
}

//新增文件接口::前端调用OSS
export function addFileBatch(data) {
  return request({
    url: '/filelibrary/api/filelibrary/appFile/addFileBatch',
    method: 'post',
    data
  })
}

// 根据角色id获取角色名称
export function roleIdConvertRoleName(data) {
  return request({
    url: '/center/role/user/roleIdConvertRoleName',
    method: 'get',
    params: data
  })
}

// 查询导入任务进度信息
export function queryTaskProcessInfo(data) {
  return request({
    url: '/crm/api/crm/sysExcelTask/queryTaskProcessInfo',
    method: 'get',
    params: data
  })
}

// 获取RSA公钥
export function getRsaPKey(data) {
  return request({
    url: '/center/auth-controller/user/getRsaPKey',
    method: 'get',
    params: data
  })
}

// 获取Client公钥
export function saveClientPKey(data) {
  return request({
    url: '/center/auth-controller/user/saveClientPKey',
    method: 'post',
    data
  })
}

// 查询企业Oss企业剩余容量 单位 Byte
export function queryCompanyOssRemainingCapacity(data) {
  return request({
    url: '/filelibrary/api/filelibrary/appFile/queryCompanyOssRemainingCapacity',
    method: 'get',
    params: data
  })
}
