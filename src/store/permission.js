import { asyncRoutes, constRoutes } from "@/router"

const state = {
  routes: [], // 完整路由表
  addRoutes: [] // 用户可访问路由表
}

const mutations = {
  setRoutes: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      commit("setRoutes", accessedRoutes);
      resolve(accessedRoutes)
    })
  }
}


/**
 * 递归过滤AsyncRoutes路由表
 * @routes 待过滤路由表，首次传入的就是AsyncRoutes
 * @roles 用户拥有角色
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route =>{
    // 复制一份
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      // 如果存在子路由则递归过滤之
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res;
}

/**
 * 根据路由meta.role确定是否当前用户拥有访问权限
 * @roles 用户拥有角色
 * @route 待判定路由
 */

 function hasPermission(roles, route) {
   // 如果当前路由有roles 字段则需判断用户访问权限
   if (route.meta && route.meta.roles) {
     return roles.some(role => route.meta.roles.includes(role))
   } else {
     return true
   }
 }

 export default {
   namespaced: true,
   state,
   mutations,
   actions
 }