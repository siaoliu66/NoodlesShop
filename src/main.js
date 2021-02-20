// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import swiper, { Navigation, Pagination, Autoplay } from 'swiper'
// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true;
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
swiper.use([Navigation, Pagination, Autoplay])

import introswiper from './components/swiper.vue';
Vue.component('intro-swiper', introswiper);
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`
    axios.post(api).then((response) => {
        console.log(response.data)
        if(response.data.success){
          next()
        }else{
          next({path:'/login'});
        }
    })
  }else{
    next()
  }
})
