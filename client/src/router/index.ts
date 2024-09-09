import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/views/HomeView.vue') },
  { path: '/privacy', component: () => import('@/views/PrivacyView.vue') },
  { path: '/impressum', component: () => import('@/views/ImpressumView.vue') },
  {
    path: '/health',
    component: () => import('@/views/HealthCheckView.vue')
  },
  {
    path: '/articles',
    component: () => import('@/views/ArticleView.vue'),
    children: [
      {
        path: '',
        component: () => import('@/components/ArticleOverview.vue')
      },
      {
        path: ':slug',
        component: () => import('@/components/ArticleDetail.vue'),
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
