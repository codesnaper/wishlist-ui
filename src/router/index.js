import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../components/Home';
import Share from './../components/ShareWish';
import Wish from './../components/Wish';
import Login from './../components/login';
import { Auth } from "aws-amplify";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
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
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //con
    Auth.currentAuthenticatedUser().then(data=>{
      console.log(data);
      next();
    }).catch(err=>{
      console.error(err);
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    })
  } else {
    next() // make sure to always call next()!
  }
})

router.afterEach(() => {
  console.log('DOne ')

});

export default router
