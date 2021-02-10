import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/HelloWorld'
import store from '../store/index'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/expence',
    name: 'Expence',
    component: () => import(/* webpackChunkName: "about" */ '../components/Expence')
  },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: () => import(/* webpackChunkName: "about" */ '../components/Cabinet.')
    },
    {
      path: '/reg',
      name:'reg',
      component: () => import('../components/RegisterPage')
    }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next) => {
  console.log(to.path.toString())
  if(to.path!=='/reg' && !store.getters.token){
    next('/reg')
  }else {
    next()
  }
})

export default router
