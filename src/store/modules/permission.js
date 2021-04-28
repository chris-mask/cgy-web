import { constantRouterMap } from '@/router'
import { getNavigationMenu } from '@/api/user'
import Layout from '@/views/layout/Layout'
//
// /**
//  * 通过meta.role判断是否与当前用户权限匹配
//  * @param roles
//  * @param route
//  */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }
//
// /**
//  * 递归过滤异步路由表，返回符合用户角色权限的路由表
//  * @param asyncRouterMap
//  * @param roles
//  */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }
/**
 * 格式化权限菜单
 * @param authMenus 接口传回的权限菜单列表
 */
function queryAuthMenus(authMenus) {
  const willAddRouter = []
  if (authMenus) {
    authMenus.forEach(mItem => {
      const menuItem = {
        path: mItem.resource_url,
        name: mItem.resource_name,
        meta: { title: mItem.resource_name, icon: mItem.resource_icon }
      }
      if (mItem.resource_category === 2) {
        menuItem.hidden = true
      }
      if (mItem.remarks && mItem.remarks !== '') {
        menuItem.meta.title = mItem.remarks
      }
      if (mItem.resource_code === 'Layout') {
        menuItem.component = Layout
      } else {
        menuItem.component = () => import(`@/views${mItem.resource_code}`)
        // 下面是方式2
        // menuItem.component = resolve => require([`../../views${mItem.resource_code}`], resolve)
      }
      if (mItem.children_menus && mItem.children_menus.length > 0) {
        menuItem.children = queryAuthMenus(mItem.children_menus)
      }
      willAddRouter.push(menuItem)
    })
  }
  return willAddRouter
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    authMenus: {}
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_AUTH_MENUS: (state, menus) => {
      state.authMenus = menus
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        let param = {
          companyId: data,
          securitycode: data,
        };
        getNavigationMenu(param).then(response => {
          // //console.log(response);
          if (!response.data) {
            reject('error')
          }
          if (response.data.auth_menus && response.data.auth_menus.length > 0) {
            const willAddRouter = queryAuthMenus(response.data.auth_menus)
            willAddRouter.push({ path: '*', redirect: '/404', hidden: true })
            commit('SET_ROUTERS', willAddRouter)
            commit('SET_AUTH_MENUS', response.data.resource_dic)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
