import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/BaseView.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('@/components/BaseLanding.vue')
      },
      {
        path: '/privacy',
        component: () => import('@/components/InfoPrivacy.vue')
      },
      {
        path: '/impressum',
        component: () => import('@/components/InfoImprint.vue')
      }
    ]
  },
  {
    path: '/articles',
    component: () => import('@/views/BaseView.vue'),
    children: [
      {
        path: '',
        component: () => import('@/components/ArticleOverview.vue')
      },
      {
        name: 'article-detail',
        path: ':slug',
        component: () => import('@/components/ArticleDetail.vue'),
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
