import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Post from './views/Post.vue'
import './styles/global.css'

const routes = [
  { path: '/', component: Home },
  { path: '/post/:id', component: Post },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
