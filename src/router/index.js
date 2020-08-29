import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../components/Home';
import Share from './../components/ShareWish';
import Wish from './../components/Wish';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/share',
    name: 'Share',
    component: Share,
  },
  {
    path: '/wish',
    name: 'wish',
    component: Wish,
  }
]

const router = new VueRouter({
  routes
})

export default router
