import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (store.state.token) {
    if (!store.state.haveGetPermission) {
      store
        .dispatch('greateRoutes')
        .then((res) => {
          console.log('res', res)
          router.addRoutes(res)
          next({ ...to, replace: true })
        })
        .catch((err) => {
          console.log('err', err)
          store.commit('loginOut')
          next('/')
        })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})
