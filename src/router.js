import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import EventsPage from './views/EventsPage.vue'
import CreateEvent from './views/CreateEvent.vue'

import { store } from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/events/:type',
      name: 'events',
      component: EventsPage
    },
    {
      path: '/create-event',
      name: 'createEvent',
      component: CreateEvent
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = store.state.user.user
  let requireAuth = to.matched.some(record => record.meta.requireAuth)
  let guestOnly = to.matched.some(record => record.meta.guestOnly)

  if (requireAuth && !currentUser) next('/login')
  else if (guestOnly && currentUser) next('/')
  else next()
})

export default router
