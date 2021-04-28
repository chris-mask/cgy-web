// 把表单验证的错误提示封装
export function callbackError(that, error) {
  for (var key in error) {
    that.tempArr = error[key]
    break
  }
  that.$message({
    type: 'error',
    message: that.tempArr[0].message
  })
}
