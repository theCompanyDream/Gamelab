import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import router from './components/router'
import { inject } from '@vercel/analytics'

inject();

createApp(App).use(router).mount('#app')
