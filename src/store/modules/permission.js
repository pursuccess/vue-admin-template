import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes 可访问的路由一维数组
 * @param roles
 */
export function filterAsyncRoutes(asyncRoutes, routes) {
  const res = []

  asyncRoutes.forEach(route => {
    const tmp = { ...route }

    if (!tmp.name) {
      res.push(tmp)
    } else if (routes.includes(tmp.name)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, routes)
      }
      res.push(tmp)
    }
  })
  return res
}

// routes生成name的数组
function routesKeys(routes) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.children) {
      res.push(...routesKeys(tmp.children))
    }
    res.push(tmp.name)
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, routes) {
    const keys = routesKeys(routes)
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, keys)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
