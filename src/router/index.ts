import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
      meta: { title: '首页', showTabBar: true },
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/list/index.vue'),
      meta: { title: '列表', showTabBar: true },
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/detail/index.vue'),
      meta: { title: '详情', showTabBar: false },
    },
    {
      path: '/demos',
      name: 'demos',
      component: () => import('../views/demos/index.vue'),
      meta: { title: 'Demo 总览', showTabBar: true },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
