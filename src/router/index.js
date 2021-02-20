import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/front/index'
import Login from '@/components/front/login'
import dashboard from '@/components/back/dashboard'
import Product from '@/components/back/pages/products'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect:{
        path: '/login',
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: dashboard,
      children:[
        {
          path: 'products',
          name: 'Products',
          component: Product,
          meta: { requiresAuth: true },
        },
      ]
    },
  ]
})
