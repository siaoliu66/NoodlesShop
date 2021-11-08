import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/front/index'
import Menu from '@/components/front/menu'
import Productpage from '@/components/front/productpage'
import Favorite from '@/components/front/favorite'
import Login from '@/components/front/login'
import Cart from '@/components/front/cart'
import Checkout from '@/components/front/checkout_order'
import News from '@/components/front/news'
import About from '@/components/front/aboutUs'
import dashboard from '@/components/back/dashboard'
import Product from '@/components/back/pages/products'
import Orders from '@/components/back/pages/orders'
import Coupon from '@/components/back/pages/coupon'
Vue.use(Router)

// 解决重复点击路由报错的BUG
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}


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
      path: '/news',
      name: 'News',
      component: News,
    },
    {
      path: '/aboutUs',
      name: 'About',
      component: About,
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite,
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
    {//產品內頁
      path: '/productpage/:product_id',
      name: 'Productpage',
      component: Productpage,
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
