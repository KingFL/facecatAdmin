import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '/index',
    component: Layout,
    // alwaysShow: true,
    children: [
      {
        path: 'index',
        name: '首页',
        isroot: false, // !!Cookies.get('role'),
        component: () => import('@/views/index/index'),
        meta: { title: '首页', icon: 'icon-lunbotu' }
      }
    ]
  },
  {
    path: '/swiper',
    component: Layout,
    // alwaysShow: true,
    children: [
      {
        path: 'index',
        name: '用户管理',
        isroot: false, // !!Cookies.get('role'),
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'icon-lunbotu' }
      }
    ]
  },
  // {
  //   path: '/moment',
  //   component: Layout,
  //   // alwaysShow: true,
  //   children: [
  //     {
  //       path: 'index',
  //       name: '动态管理',
  //       isroot: false, // !!Cookies.get('role'),
  //       component: () => import('@/views/moments/index'),
  //       meta: { title: '动态管理', icon: 'icon-lunbotu' }
  //     }
  //   ]
  // },
  {
    path: '/cat',
    component: Layout,
    // alwaysShow: true,
    children: [
      {
        path: 'index',
        name: '猫咪管理',
        isroot: false, // !!Cookies.get('role'),
        component: () => import('@/views/cats/index'),
        meta: { title: '猫咪管理', icon: 'icon-lunbotu' }
      }
    ]
  },
  {
    path: '/location',
    component: Layout,
    // alwaysShow: true,
    children: [
      {
        path: 'index',
        name: '地址管理',
        isroot: false, // !!Cookies.get('role'),
        component: () => import('@/views/location/index'),
        meta: { title: '地址管理', icon: 'icon-lunbotu' }
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    // alwaysShow: true,

    children: [
      {
        path: 'moment',
        name: '动态管理',
        isroot: false, // !!Cookies.get('role'),
        component: () => import('@/views/moments/index'),
        meta: { title: '动态管理', icon: 'icon-lunbotu' }
      },
      {
        path: 'comments',
        name: '评论管理',
        isroot: false, // !!Cookies.get('role'),
        component: () => import('@/views/comments/index'),
        meta: { title: '评论管理', icon: 'icon-lunbotu' }
      },
    ],
    meta: { title: '内容管理', icon: 'icon-lunbotu' }
  },
  {
    path: '/Report',
    component: Layout,
    // alwaysShow: true,
    children: [
      {
        path: 'index',
        name: '反馈管理',
        isroot: false, // !!Cookies.get('role'),
        component: () => import('@/views/Report/index'),
        meta: { title: '反馈管理', icon: 'icon-lunbotu' }
      }
    ]
  },
  {
    path: '/anelyze',
    component: Layout,
    // alwaysShow: true,
    children: [
      {
        path: 'index',
        name: '统计分析',
        isroot: false, // !!Cookies.get('role'),
        component: () => import('@/views/anelyze/index'),
        meta: { title: '统计分析', icon: 'icon-lunbotu' }
      }
    ]
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

