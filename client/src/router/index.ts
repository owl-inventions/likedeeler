import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/views/HomeView.vue') },
  { path: '/privacy', component: () => import('@/views/PrivacyView.vue') },
  { path: '/impressum', component: () => import('@/views/ImpressumView.vue') },
  {
    path: '/articles/:slug',
    name: 'Article',
    component: () => import('@/views/ArticleView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
