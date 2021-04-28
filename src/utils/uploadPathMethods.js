/*
* 上传文件预设路径方法
* */
import {Message} from 'element-ui'

/*
  *  工商信息上传文件
  *  customerName 客户名称
  *  fileName 文件名称+时间
 */
export function businessUpload(customerName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/工商信息/' + fileName + '_' + date;

  return filePath;
}

/*
  *  人员信息上传文件
  *  customerName 客户名称
  *  userName 姓名
  *  fileName 文件名称+时间
 */
export function personalUpload(customerName, userName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (userName == '' || userName == undefined) {
    Message({message: '缺少姓名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/人员信息/' + userName + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  财务信息上传文件
  *  customerName 客户名称
  *  year 年
  *  fileName 文件名称+时间
 */
export function financeUpload(customerName, year, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (year == '' || year == undefined) {
    Message({message: '缺少年份', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/财务信息/' + year + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  研发信息上传文件
  *  customerName 客户名称
  *  fileName 文件名称+时间
 */
export function developUpload(customerName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/研发信息/项目-产品-备案/' + fileName + '_' + date;

  return filePath;
}

/*
  *  设备信息上传文件
  *  customerName 客户名称
  *  equipName 设备名称
  *  fileName 文件名称+时间
 */
export function equipmentUpload(customerName, equipName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (equipName == '' || equipName == undefined) {
    Message({message: '缺少设备名称', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/设备信息/' + equipName + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  软件信息上传文件
  *  customerName 客户名称
  *  softwareName 软件名称
  *  fileName 文件名称+时间
 */
export function softwareUpload(customerName, softwareName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (softwareName == '' || softwareName == undefined) {
    Message({message: '缺少软件名称', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/软件信息/' + softwareName + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  知识产权上传文件
  *  customerName 客户名称
  *  intellectualType 知识产权类型 专利 著作权 商标
  *  fileName 文件名称+时间
 */
export function intellectualUpload(customerName, intellectualType, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (intellectualType == '' || intellectualType == undefined) {
    Message({message: '缺少知识产权类型', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/知识产权/' + intellectualType + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  沟通消息上传文件
  *  customerName 客户名称
  *  userName 姓名
  *  fileName 文件名称+时间
 */
export function messageUpload(customerName, userName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (userName == '' || userName == undefined) {
    Message({message: '缺少姓名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/沟通消息/' + userName + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  项目合同上传文件
  *  customerName 客户名称
  *  fileName 文件名称+时间
 */
export function projectContractUpload(customerName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/项目合同/' + fileName + '_' + date;

  return filePath;
}

/*
  *  项目订单上传文件
  *  customerName 客户名称
  *  projectName 项目名称
  *  declareType 申报: 申报过程  申报书  其他资料
  *  fileName 文件名称+时间
 */
export function projectOrderUpload(customerName, projectName, declareType, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (projectName == '' || projectName == undefined) {
    Message({message: '缺少项目名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (declareType == '' || declareType == undefined) {
    Message({message: '缺少申报', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/项目订单/' + projectName + '/' + declareType + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  资料收集-开票清单上传文件
  *  customerName 客户名称
  *  year 年
  *  fileName 文件名称+时间
 */
export function dataInvoiceListUpload(customerName, year, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (year == '' || year == undefined) {
    Message({message: '缺少年份', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/资料收集/开票清单/' + year + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  资料收集-发票上传文件
  *  customerName 客户名称
  *  year 年
  *  fileName 文件名称+时间
 */
export function dataInvoiceUpload(customerName, year, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (year == '' || year == undefined) {
    Message({message: '缺少年份', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/资料收集/发票/' + year + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  资料收集-合同上传文件
  *  customerName 客户名称
  *  year 年
  *  fileName 文件名称+时间
 */
export function dataContractUpload(customerName, year, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (year == '' || year == undefined) {
    Message({message: '缺少年份', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/资料收集/合同/' + year + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  资料收集-财务报告上传文件
  *  customerName 客户名称
  *  year 年
  *  fileName 文件名称+时间
 */
export function dataFinancialReportsUpload(customerName, year, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (year == '' || year == undefined) {
    Message({message: '缺少年份', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/资料收集/财务报告/' + year + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  资料收集-企业资质上传文件
  *  customerName 客户名称
  *  fileName 文件名称+时间
 */
export function dataEnterpriseQualifiedUpload(customerName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/资料收集/企业资质/' + fileName + '_' + date;

  return filePath;
}

/*
  *  资料收集-人员资质上传文件
  *  customerName 客户名称
  *  fileName 文件名称+时间
 */
export function dataPersonalQualifiedUpload(customerName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/资料收集/人员资质/' + fileName + '_' + date;

  return filePath;
}

/*
  *  资料收集-其他佐证材料上传文件
  *  customerName 客户名称
  *  fileName 文件名称+时间
 */
export function dataOtherMaterialUpload(customerName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/资料收集/其他佐证材料/' + fileName + '_' + date;

  return filePath;
}

/*
  *  客户资料上传文件
  *  customerName 客户名称
  *  fileName 文件名称+时间
 */
export function annexUpload(customerName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()
  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/附件上传/' + fileName + '_' + date;

  return filePath;
}


/*
  *  政策通知上传文件
  *  customerName 客户名称
  *  fileName 文件名称+时间
 */
export function policyNoticeUpload(customerName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/政策通知/' + fileName + '_' + date;

  return filePath;
}

/*
  *  新增材料上传文件
  *  customerName 客户名称
  *  fileName 文件名称+时间
 */
export function addMaterialUpload(customerName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/新增材料/' + fileName + '_' + date;

  return filePath;
}

/*
  *  申报资料上传文件
  *  customerName 客户名称
  *  fileName 文件名称+时间
 */
export function declareDataUpload(customerName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/申报资料/' + fileName + '_' + date;

  return filePath;
}

/*
  *  验收资料上传文件
  *  customerName 客户名称
  *  fileName 文件名称+时间
 */
export function acceptanceDataUpload(customerName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/验收资料/' + fileName + '_' + date;

  return filePath;
}

/*
  *  文件管理上传文件
  *  customerName 客户名称
  *  classifyName 分类名
  *  fileName 文件名称+时间
 */
export function fileManageUpload(customerName, classifyName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (classifyName == '' || classifyName == undefined) {
    Message({message: '缺少分类名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/文件管理/' + classifyName + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  富文本附件上传文件
  *  customerName 客户名称
  *  modelName 模块名称
  *  date 日期
  *  fileName 文件名称+时间
 */
export function richTextUpload(customerName, modelName, dates, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (modelName == '' || modelName == undefined) {
    Message({message: '缺少模块名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (dates == '' || dates == undefined) {
    Message({message: '缺少日期', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/富文本附件/' + modelName + '/' + dates + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  政策上传文件
  *  provinceName 省
  *  cityName 市
  *  fileName 文件名称+时间
 */
export function policyUpload(provinceName, cityName, dates, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (provinceName == '' || provinceName == undefined) {
    Message({message: '缺少省名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (dates == '' || dates == undefined) {
    Message({message: '缺少日期', type: 'error', duration: 5 * 1000});
    return;
  }

  let filePath
  if (cityName == '' || !cityName) {
    filePath = '政策/' + provinceName + '/' + dates + '/' + fileName + '_' + date;
  }else{
    filePath = '政策/' + provinceName + '/' + cityName + '/' + dates + '/' + fileName + '_' + date;
  }

  return filePath;
}

/*
  *  政策项目材料模板上传文件
  *  provinceName 省
  *  cityName 市
  *  projectName 项目名称
  *  fileName 文件名称+时间
 */
export function policyProjectUpload(provinceName, cityName, projectName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (provinceName == '' || provinceName == undefined) {
    Message({message: '缺少省名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (projectName == '' || projectName == undefined) {
    Message({message: '缺少项目名', type: 'error', duration: 5 * 1000});
    return;
  }

  let filePath
  if (cityName == '' || cityName == undefined) {
    filePath = '政策/' + provinceName + '/' + projectName + '/' + fileName + '_' + date;
  }else{
    filePath = '政策/' + provinceName + '/' + cityName + '/' + projectName + '/' + fileName + '_' + date;
  }

  return filePath;
}

/*
  *  通知上传文件
  *  provinceName 省
  *  cityName 市
  *  fileName 文件名称+时间
 */
export function noticeUpload(provinceName, cityName, dates, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (provinceName == '' || provinceName == undefined) {
    Message({message: '缺少省名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (dates == '' || dates == undefined) {
    Message({message: '缺少日期', type: 'error', duration: 5 * 1000});
    return;
  }

  let filePath
  if (cityName == '' || cityName == undefined) {
    filePath = '通知/' + provinceName + '/' + dates + '/' + fileName + '_' + date;
  }else{
    filePath = '通知/' + provinceName + '/' + cityName + '/' + dates + '/' + fileName + '_' + date;
  }

  return filePath;
}

/*
  *  立项公示文件
  *  provinceName 省
  *  cityName 市
  *  fileName 文件名称+时间
 */
export function approvalPublicityUpload(provinceName, cityName, dates, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (provinceName == '' || provinceName == undefined) {
    Message({message: '缺少省名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (cityName == '' || cityName == undefined) {
    Message({message: '缺少市名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (dates == '' || dates == undefined) {
    Message({message: '缺少日期', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '立项公示/' + provinceName + '/' + cityName + '/' + dates + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  申报指南文件
  *  projectName 项目
  *  fileName 文件名称+时间
 */
export function declareGuideUpload(projectName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (projectName == '' || projectName == undefined) {
    Message({message: '缺少项目名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '申报指南/项目模板/' + projectName + '/' + fileName + '_' + date;

  return filePath;
}


/*
  *  政策原文上传文件
  *  customerName 客户名称
  *  classifyName 分类名
  *  fileName 文件名称+时间
 */
export function policyManageUpload(customerName, classifyName, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (customerName == '' || customerName == undefined) {
    Message({message: '缺少客户名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (classifyName == '' || classifyName == undefined) {
    Message({message: '缺少分类名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '客户资料/' + customerName + '/文件管理/' + classifyName + '/' + fileName + '_' + date;

  return filePath;
}

/*
  *  内部文库上传文件
  *  fileRootName 文件根名称
  *  filePath 文件路径
  *  fileName 文件名称+时间
 */
export function fileManage(fileRootName, fileCatalog, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (fileRootName == '' || fileRootName == undefined) {
    Message({message: '缺少文件目录', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }

  let filePath = '';

  if(fileCatalog === ''){
    filePath = `${fileRootName}/${fileName}_${date}`;
  }else{
    filePath = `${fileRootName}/${fileCatalog}/${fileName}_${date}`;
  }
  return filePath;
}

/*
  *  项目库上传文件
  *  projectName 项目名称
  *  picType 图标 图片
  *  fileName 项目名称+时间
 */
export function projectCenterUpload(projectName, picType, fileName) {
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds()

  if (projectName == '' || projectName == undefined) {
    Message({message: '缺少项目名称', type: 'error', duration: 5 * 1000});
    return;
  }
  if (fileName == '' || fileName == undefined) {
    Message({message: '缺少文件名', type: 'error', duration: 5 * 1000});
    return;
  }
  if (picType == '' || picType == undefined) {
    Message({message: '缺少分类名', type: 'error', duration: 5 * 1000});
    return;
  }
  let filePath = '项目/' + projectName + '/' + picType + '/' + fileName + '_' + date;

  return filePath;
}
