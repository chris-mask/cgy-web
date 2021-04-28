import request from '@/utils/request'
import requestDownload from '@/utils/requestDownload';
import requestLoading from '@/utils/requestLoading'



/////////////////////////// 专利列表 /////////////////////////////////

// 条件查询 专利列表
export function queryPatentList(data) {
  return request({
    url: '/crm/api/crm/iprPatent/queryPatentList',
    method: 'POST',
    data
  })
}

//专利列表 删除专利记录
export function deletePatentByIds(data) {
  return requestLoading({
    url: '/crm/api/crm/iprPatent/deletePatentByIds',
    method: 'POST',
    data
  })
}


//专利列表 导出
export function exportPatentList(data) {
  return requestLoading({
    url: '/crm/api/crm/iprPatent/exportPatentList',
    method: 'POST',
    data
  })
}

//专利列表 新增
export function savePatent(data) {
  return requestLoading({
    url: '/crm/api/crm/iprPatent/savePatent',
    method: 'POST',
    // headers: {'Content-Type':'application/x-www-form-urlencoded'},
    // params: data
    data
  })
}

//专利列表 编辑
export function updatePatent(data) {
  return requestLoading({
    url: '/crm/api/crm/iprPatent/updatePatent',
    method: 'POST',
    data
  })
}



//专利列表 详情
export function getIndexProjectData(data) {
  return request({
    url: '/crm/api/crm/iprPatent/queryPatentInfoById',
    method: 'get',
    params: data
  })
}

//专利列表 下载模板
export function downloadTemplate(data) {
  return requestDownload({
    url: '/crm/api/download/common/download',
    method: 'get',
    params: data,
    responseType: 'blob',
  })
}


//////////////////////////// 著作权 ////////////////////////////////


//著作权列表
export function queryCopyrightList(data) {
  return request({
    url: '/crm/api/crm/iprCopyright/queryCopyrightList',
    method: 'post',
    data
  })
}

//著作权 新增
export function saveCopyright(data) {
  return requestLoading({
    url: '/crm/api/crm/iprCopyright/saveCopyright',
    method: 'POST',
    data
  })
}

//著作权 编辑
export function updateCopyright(data) {
  return requestLoading({
    url: '/crm/api/crm/iprCopyright/updateCopyright',
    method: 'POST',
    data
  })
}

//著作权 详情
export function queryCopyrightInfoById(data) {
  return request({
    url: '/crm/api/crm/iprCopyright/queryCopyrightInfoById',
    method: 'get',
    params: data
  })
}

//著作权 删除著作权
export function deleteCopyrightByIds(data) {
  return requestLoading({
    url: '/crm/api/crm/iprCopyright/deleteCopyrightByIds',
    method: 'POST',
    data
  })
}

//著作权 导出
export function exportCopyrightList(data) {
  return requestLoading({
    url: '/crm/api/crm/iprCopyright/exportCopyrightList',
    method: 'POST',
    data
  })
}


///////////////////////////// 商标列表 ///////////////////////////////


//商标列表
export function queryTrademarkList(data) {
  return request({
    url: '/crm/api/crm/iprTrademark/queryTrademarkList',
    method: 'POST',
    data
  })
}


//商标列表 新增
export function saveTrademark(data) {
  return requestLoading({
    url: '/crm/api/crm/iprTrademark/saveTrademark',
    method: 'POST',
    data
  })
}

//商标列表 编辑
export function updateTrademark(data) {
  return requestLoading({
    url: '/crm/api/crm/iprTrademark/updateTrademark',
    method: 'POST',
    data
  })
}

//商标列表 导出
export function exportTrademarkList(data) {
  return requestLoading({
    url: '/crm/api/crm/iprTrademark/exportTrademarkList',
    method: 'POST',
    data
  })
}

//商标列表 详情
export function queryTrademarkInfoById(data) {
  return request({
    url: '/crm/api/crm/iprTrademark/queryTrademarkInfoById',
    method: 'get',
    params: data
  })
}

//商标列表 删除
export function deleteTrademarkByIds(data) {
  return requestLoading({
    url: '/crm/api/crm/iprTrademark/deleteTrademarkByIds',
    method: 'POST',
    data
  })
}


////////////////////////////// 证书 //////////////////////////////
//证书 查询证书列表
export function queryCertificateList(data) {
  return request({
    url: '/crm/api/crm/iprCertificate/queryCertificateList',
    method: 'POST',
    data
  })
}

//证书 新增
export function saveCertificate(data) {
  return requestLoading({
    url: '/crm/api/crm/iprCertificate/saveCertificate',
    method: 'POST',
    data
  })
}

//证书 编辑
export function updateCertificate(data) {
  return requestLoading({
    url: '/crm/api/crm/iprCertificate/updateCertificate',
    method: 'POST',
    data
  })
}

//证书 删除
export function deleteCertificateByIds(data) {
  return requestLoading({
    url: '/crm/api/crm/iprCertificate/deleteCertificateByIds',
    method: 'POST',
    data
  })
}

//证书 导出
export function exportCertificateList(data) {
  return requestLoading({
    url: '/crm/api/crm/iprCertificate/exportCertificateList',
    method: 'POST',
    data
  })
}

//商标列表 详情
export function queryCertificateInfoById(data) {
  return request({
    url: '/crm/api/crm/iprCertificate/queryCertificateInfoById',
    method: 'get',
    params: data
  })
}











