import request from '@/utils/request'
import requestLoading from '@/utils/requestLoading'

const pre = '/policy'

// 查询所有项目库信息
export function queryAll(data) {
  return requestLoading({
    url: pre + '/api/policy/policyProject/queryAll',
    method: 'post',
    data
  })
}

// 删除项目库子项
export function removeItem(data) {
  return requestLoading({
    url: pre + '/api/policy/policyProject/removeItem',
    method: 'get',
    params: data
  })
}

// 删除年表记录
export function removeyear(data) {
  return requestLoading({
    url: pre + '/api/policy/policyProject/removeyear',
    method: 'get',
    params: data
  })
}
// 保存基础项目信息
export function save(data) {
  return requestLoading({
    url: pre + '/api/policy/policyProject/save',
    method: 'post',
    data
  })
}

// 删除项目记录
export function removelibrary(data) {
  return requestLoading({
    url: pre + '/api/policy/policyProject/removelibrary',
    method: 'get',
    params: data
  })
}

// 修改项目信息
export function update(data) {
  return requestLoading({
    url: pre + '/api/policy/policyProject/update',
    method: 'post',
    data
  })
}

// 根据项目类型查询项目名称
export function queryProjectNameOfProjectType(data) {
  return request({
    url: pre + '/api/policy/policyProject/queryProjectNameOfProjectType',
    method: 'post',
    data
  })
}

// 根据项目类型查询项目名称
export function exportPolicyProject(data) {
  return request({
    url: pre + '/api/policy/policyProject/exportPolicyProject',
    method: 'post',
    data
  })
}

// 根据项目id获取匹配得到的公司
export function getMatchingCompany(data) {
  return requestLoading({
    url: pre + '/api/policy/policyApplyConditionMatchingResult/queryMatchingCompanyList',
    method: 'post',
    data
  })
}

// 根据项目id和公司id获取匹配详情
export function matchingCompanyInfo(data) {
  return requestLoading({
    url: pre + '/api/policy/policyApplyConditionMatchingResult/getMatchingCompanyInfo',
    method: 'get',
    params: data
  })
}


// 修改已得分
export function updateMatchingCompanyGetScore(data) {
  return request({
    url: pre + '/api/policy/policyApplyConditionMatchingResult/updateMatchingCompanyGetScore',
    method: 'post',
    data
  })
}

// 手动执行智能匹配
export function manualMatching(data) {
  return requestLoading({
    url: pre + '/api/portalpublic/policyNoticePush/manualMatching',
    method: 'get',
    params: data
  })
}


// 获取项目最大批次
export function queryProjectMaxBatch(data) {
  return requestLoading({
    url: pre + '/api/policy/policyProject/getProjectMaxBatch',
    method: 'get',
    params: data
  })
}

// 获取职称系列
export function queryTitleSeriesOrLevel(data) {
  return requestLoading({
    url: pre + '/api/policy/policyProject/getTitleSeriesOrLevel',
    method: 'get',
    params: data
  })
}
