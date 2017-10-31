import VueRouter from 'vue-router';

import Login from './components/login.vue'
import Chat from './components/chat/chat.vue'
import Auth from './components/Auth.vue'
import AuthSuccess from './components/AuthSuccess.vue'

const router = new VueRouter({
  routes: [
    { path: '/', component: Auth },
    { path: '/auth', component: Auth },
    { path: '/success', component: AuthSuccess },
    { path: '/chat', component: Chat },
    { path: '/login', component: Login }
    
  ],
  mode: 'history'
})

export default router
