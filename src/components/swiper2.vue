<template>
  <swiper class="swiper" :options="swiperOption" >
    <swiper-slide  v-for="(slide, key) in swiperList" :key="key" >
        <div align="center" class="swiperimg" :style="'backgroundImage:url('+ slide +')'">
            <!-- <img :src="slide" alt=""> -->
        </div>
    </swiper-slide>
  </swiper>
</template>
<style lang="scss">
    .swiperimg{
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 350px;
    }
</style>
<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'
  export default {
    name: 'swiper-example-multiple-slides-per-biew',
    title: 'Multiple slides per view',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperList :[
            'https://images.unsplash.com/photo-1597345637412-9fd611e758f3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
            'https://images.unsplash.com/photo-1610554675919-858d84c76d40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
            'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
            'https://images.unsplash.com/photo-1551638059-d1fb82606c4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',
            'https://images.unsplash.com/photo-1613744013720-4f505ce31735?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
        ],
        swiperOption: {
          slidesPerView: 4,
          loop : true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    }
  }
</script>