import request from '@/utils/request'

// 查询登录日志
export function queyryLoginLog(data) {
  return request({
    url: '/center/log/user/queyryLoginLog',
    method: 'post',
    data
  })
}

// 查询操作日志
export function queyryOperLog(data) {
  return request({
    url: '/center/log/user/queyryOperLog',
    method: 'post',
    data
  })
}

// 统计登录日志
export function queryLoginLogCount(data) {
  return request({
    url: '/center/log/user/queryLoginLogCount',
    method: 'post',
    data
  })
}

// 统计操作日志
export function queryOperLogCount(data) {
  return request({
    url: '/center/log/user/queryOperLogCount',
    method: 'post',
    data
  })
}

// 登录日志排名
export function queryLoginLogRank(data) {
  return request({
    url: '/center/log/user/queryLoginLogRank',
    method: 'post',
    data
  })
}

// 操作日志排名
export function queryOperLogRank(data) {
  return request({
    url: '/center/log/user/queryOperLogRank',
    method: 'post',
    data
  })
}

// 查询代码错误日志
export function queryCodeLog(data) {
  return request({
    url: '/center/log/user/code/queryCodeLog',
    method: 'post',
    data
  })
}


// 处理异常记录
export function updateCodeLog(data) {
  return request({
    url: '/center/log/user/code/updateCodeLog',
    method: 'post',
    data
  })
}


 