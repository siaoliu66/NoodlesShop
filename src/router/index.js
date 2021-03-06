import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/front/index'
import Menu from '@/components/front/menu'
import Login from '@/components/front/login'
import Cart from '@/components/front/cart'
import Checkout from '@/components/front/checkout_order'
import dashboard from '@/components/back/dashboard'
import Product from '@/components/back/pages/products'
import Orders from '@/components/back/pages/orders'
import Coupon from '@/components/back/pages/coupon'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect:{
        path: '/index',
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/checkout/:order_id',
      name: 'Checkout',
      component: Checkout,
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
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        },
      ]
    },
  ]
})
