<template>
<div>
  <swiper class="swiper" :options="swiperOption" >
    <swiper-slide style="background-image: url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80);back
background-repeat: no-repeat;background-size: cover;background-position: center;"></swiper-slide>
    <swiper-slide style="background-image: url(https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80);
background-repeat: no-repeat;background-size: cover;background-position: center;"></swiper-slide>
    <swiper-slide style="background-image: url(https://images.unsplash.com/photo-1482859602406-7659b00979fb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);
background-repeat: no-repeat;background-size: cover;background-position: center;"></swiper-slide>
    <swiper-slide style="background-image: url(https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80);
background-repeat: no-repeat;background-size: cover;background-position: center;"></swiper-slide>
    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
  </swiper>
  <div class="dropdown">
    <a href="#" class="slide" @click="slide">
      <i class="fas fa-chevron-double-down"></i>
    </a>
    
  </div>
  
</div>
  
</template>
<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'
  import $ from "jquery"
  export default {
    name: 'swiper-example-navigation',
    title: 'Navigation',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            autoplay:true,
            loop : true,
        }
      }
    },
    methods:{
      slide:function(){
        const pos = document.querySelector('.swiper').offsetHeight
        $('html, body').animate({scrollTop: pos-50 +'px'}, 500);
      }
    }
  }
</script>
<style scoped lang="scss">
@keyframes slide-bottom {
  0% {
            transform: translateY(-5px);
  }
  50% {
            transform: translateY(10px);
  }
  100% {
            transform: translateY(10px);
  }
}
 .swiper{
    height:100vh;
    width: 100%;
  }
  .dropdown{
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    font-size: 36px;
    animation:slide-bottom .8s 0s infinite alternate both;
    .slide{
      color: orange;
    }
  }
/* pad版 */
@media (max-width: 768px){
  .swiper{
    height:50vh;
  }
  .dropdown{
    bottom: 52%;

  }
}

</style>
