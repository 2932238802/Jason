import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/index-test',
  },
  {
    path: '/index-test',
    name: 'IndexTest',
    component: () => import('../views/index_test.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
