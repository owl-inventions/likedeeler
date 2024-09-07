import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { strapiClient } from '@/utils/axios/strapi.client'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$strapi = strapiClient

app.mount('#app')
