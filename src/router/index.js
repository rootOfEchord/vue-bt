import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/main'
import login from '@/views/login'

Vue.use(Router)

// 需要做权限配置的路由
export const routers = [
  {
    path: '/resource',
    name: 'resource',
    meta: {
      title: '资源管理',
      isActive: true,
      icon: 'el-icon-s-platform',
      activePath: '',
      value: 'RECORUS_MANAGER',
    },
    component: index,
    children: [
      {
        path: 'sort',
        name: 'resource-sort',
        meta: {
          title: '资源分类管理',
          icon: 'el-icon-menu',
          activePath: '',
          value: 'RECORUS_CATE_MANAGER',
        },
        component: () => import('@/views/resource/sort'),
      },
    ],
  },
]

// 不需要权限的路由
export const defaultRouters = [
  {
    path: '/work',
    name: 'work',
    redirect: 'work/index',
    meta: { title: '工作台', isActive: true, icon: 'el-icon-s-cooperation', activePath: '' },
    component: index,
    children: [
      {
        path: 'index',
        name: 'workIndex',
        meta: { title: '工作台', isActive: true, icon: 'el-icon-s-cooperation', activePath: '' },
        component: () => import('@/views/work'),
      },
    ],
  },
]

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/work',
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    ...defaultRouters,
  ],
})
