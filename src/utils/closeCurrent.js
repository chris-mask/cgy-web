/*
* 关闭当前页面返回上一页方法
* 作者：李馥池
* */
import router from './../router/index'

function closeCurrent(current,route,path){
  if(current.length == 1){
    current.splice(current.findIndex(item => item.path === route.path), 1)
    router.push({path:'/dashboard'})
  }else{
    if(path != undefined){
      current.splice(current.findIndex(item => item.path === route.path), 1)
      router.push({path: path})
    }else{
      current.splice(current.findIndex(item => item.path === route.path), 1)
      router.push(current[current.length - 1].path)
    }
  }
}

export default {
  closeCurrent
}
