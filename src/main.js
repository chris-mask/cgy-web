import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import '@/styles/index.scss' // global css

ElementUI.Dialog.props.closeOnClickModal.default = false

import  './assets/css/style.css'

import App from './App'
import router from './router'
import store from './store'
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
import {authorityControl} from './utils/auth'
import {echarts} from 'echarts'
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueClipboard from 'vue-clipboard2'
import scroll from 'vue-seamless-scroll'
import preventReClick from './utils/plugins' //防多次点击，重复提交
import './utils/directives.js';

// import secret from '@/utils/secret'   //加密解密
import versionTood from '@/utils/versionUpdate'

import socket from '@/utils/webSocket'
Vue.prototype.createSocket = socket.createSocket  //创建连接
Vue.prototype.getWebIP = socket.getWebIP          //连接地址
Vue.prototype.sendMsg = socket.sendMsg            //发送方法
Vue.prototype.closeConnect = socket.closeConnect  //断开连接


import rsaEncryption from '@/utils/rsaEncryption'
Vue.prototype.createKey = rsaEncryption.createKey                 //创建公私钥
Vue.prototype.getRsaEncryption = rsaEncryption.getRsaEncryption   //Rsa加密
Vue.prototype.getRsaDecrypt = rsaEncryption.getRsaDecrypt         //Rsa解密

import 'lib-flexible'

//提示公用组件
import tip from '../src/components/tipTag/index'
Vue.component("tip",tip);

Vue.use(ElementUI)
Vue.use(CKEditor)
Vue.use(VueClipboard)
Vue.use(scroll);


//全局权限控制方法
Vue.prototype.authorityControl = authorityControl;
Vue.prototype.$echarts = echarts;

//全局退出页面方法
Vue.prototype.closeCurrent = function (current, route, path) {
  if (current.length == 1) {
    current.splice(current.findIndex(item => item.path === route.path), 1)
    router.push({path: '/dashboard'})
  } else {
    if (path != undefined) {
      current.splice(current.findIndex(item => item.path === route.path), 1)
      router.push({path: path})
    } else {
      current.splice(current.findIndex(item => item.path === route.path), 1)
      router.push(current[current.length - 1].path)
    }
  }
}

Vue.config.productionTip = false

import {Loading} from 'element-ui'

let loading
router.beforeEach((to, from, next) => {
  loading = Loading.service({
    lock: true,
    text: 'Loading……',
    target: '.main-container'
  })
  // if (!saveState.state.isSave) {
  // 处理未保存弹出框
  // }

  versionTood.isNewVersion();
  next()
  loading.close()
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
