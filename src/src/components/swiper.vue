<template>

  <swiper class="swiper" :options="swiperOption" >
    <swiper-slide style="background-image: url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80);back
background-repeat: no-repeat;background-size: cover;background-position: center;"></swiper-slide>
    <swiper-slide style="background-image: url(https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80);
background-repeat: no-repeat;background-size: cover;background-position: center;"></swiper-slide>
    <swiper-slide style="background-image: url(https://images.unsplash.com/photo-1482859602406-7659b00979fb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);
background-repeat: no-repeat;background-size: cover;background-position: center;"></swiper-slide>
    <swiper-slide style="background-image: url(https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80);
background-repeat: no-repeat;background-size: cover;background-position: center;"></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'
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
    }
  }
</script>
<style scoped>
 .swiper{
    height:80vh
  }
/* pad版 */
@media (max-width: 768px){
  .swiper{
    height:50vh
  }
}

</style>
