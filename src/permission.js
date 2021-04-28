import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import versionTool from '@/libs/versionUpdate'

NProgress.configure({showSpinner: false})// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  // 12-16 先不进行权限判断
  // if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  // if (!permissionRoles) return true
  // return roles.some(role => permissionRoles.indexOf(role) >= 0)
  return true
}

const whiteList = ['/login', '/authredirect', '/register', '/registerJoin', '/invitationJoin','/']// no redirect whitelist

router.beforeEach((to, from, next) => {

  //判断当前代码版本是否与服务器中代码版本一致，如不一致则刷新页面获取最新
  versionTool.isNewVersion();

  NProgress.start() // start progress bar
  if (store.state.user.accessToken) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      next()
      // let companyId = store.getters.companyId;
      // if (companyId) {
      //   store.dispatch('getNavsData', {companyId}).then(() => {
      //     setTimeout(() => {
      //       let nav = store.getters.navList;
      //       nav.forEach(item=>{
      //         item.path = item.webUrl;
      //
      //         if(item.child.length > 0){
      //           item.child.forEach(child=>{
      //             child.path = child.webUrl;
      //           })
      //         }
      //       });
      //       store.commit('GET_NAV_DATA',nav);
      //     }, 500)
      //   })
      // }
      // if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
      //   store.dispatch('GetUserInfo').then(res => { // 拉取user_info
      //     const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
      //     store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
      //       router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      //       next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      //     })
      //   }).catch((err) => {
      //     store.dispatch('FedLogOut').then(() => {
      //       Message.error(err || '权限失效，请重新登录')
      //       next({ path: '/' })
      //     })
      //   })
      // } else {
      //   // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
      //   if (hasPermission(store.getters.roles, to.meta.roles)) {
      //     next() // 12-18
      //   } else {
      //     next({ path: '/401', replace: true, query: { noGoBack: true }})
      //   }
      //   // 可删 ↑
      // }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  document.title = router.currentRoute.name
  // 借贷(router.history.current.path)
  store.state.pagePath = router.history.current.path
  NProgress.done() // finish progress bar
})
