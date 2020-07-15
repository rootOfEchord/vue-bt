import Vue from 'vue'
import Vuex from 'vuex'
import * as utils from '@/config/utils'
import { routers } from '../router'
import * as userInfoApi from '@/api/userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routers: [],
    token: utils.getStore('token') || '',
    userInfo: utils.getStore('user-info') || {},
    userPermissionList: [],
    haveGetPermission: false
  },
  getters: {
    token(state) {
      return state.token
    }
  },
  mutations: {
    //设置token
    setToken(state, newData) {
      state.token = newData
      utils.setStore('token', newData)
    },
    setUserInfo(state, newData) {
      state.userInfo = newData
      utils.setStore('user-info', newData)
    },
    setRouters(state, list) {
      state.routers = list
    },
    loginOut(state) {
      state.token = ''
      state.userInfo = ''
      state.routers = []
      state.haveGetPermission = false
      utils.removeStore('token')
      utils.removeStore('user-info')
    },
    setUserPermissionList(state, val) {
      state.userPermissionList = val
    },
    setHaveGetPermission(state, val) {
      state.haveGetPermission = val
    }
  },
  actions: {
    async greateRoutes({commit}) {
      return new Promise((resolve, reject) => {
        userInfoApi.userPermission().then(res => {
          let newRouters = filterAsyncRouter(routers, res)
          console.log('newRouters', newRouters)
          commit('setRouters', newRouters)
          commit('setUserPermissionList', res)
          commit('setHaveGetPermission', true)
          resolve(newRouters)
        }).catch(res => {
          reject(res)
        })
      })
    },
    async getUserInfo({commit}) {
      let res = await userInfoApi.getUserInfo()
      commit('setUserInfo', res)
    },
    async getAccessToken({commit}) {
      let res = await userInfoApi.getAccessToken()
      commit('setToken', res.token)
    }
  }
})


/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission (menus, route) {
  // if (process.env.NODE_ENV === 'development') {
  //   return true
  // }
  if (!route.meta || !route.meta.value) return true
  const finded = menus.find(v => {
    return v.value === route.meta.value
  })
  return finded
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter (routes, menus) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(menus, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, menus)
      }
      res.push(tmp)
    }
  })

  // return routes
  return res
}
