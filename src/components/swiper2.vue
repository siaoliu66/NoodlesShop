<template>
<div class="menubanner">
    <swiper class="swiper" :options="swiperOption" >
    <swiper-slide  v-for="(slide, key) in swiperList" :key="key" >
        <div align="center" class="swiperimg" :style="'backgroundImage:url('+ slide.imgUrl +')'">
          <p class="name"> {{ slide.name }}</p>
        </div>
    </swiper-slide>
    <div class="swiper-pagination2" slot="pagination"></div>
  </swiper>
   <router-link class="go btn btn-outline-dark mt-3" to="/menu">來去點餐</router-link>
</div>


</template>
<style lang="scss" scope>
    .swiperimg{
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 300px;
    }
    .name{
      padding-top: 255px;
      font-size: 1.3em;
      color: #000;
      letter-spacing: 3px;
      font-weight: bolder;
      text-shadow: 2px 2px 2px #fbda41;
    }
    .swiper-pagination2{
      text-align: center;
      position: absolute;
      z-index: 100;
    }
    .go{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: #A46843;
      border-color: #A46843;
      &:hover{
          color: #fff;
          background-color: #A46843;

      }
    }
    
    @media (max-width: 992px){
      .swiperimg{
        height:270px;
        .name{
          padding-top: 230px;
        }
      }
    }
    
    @media (max-width: 768px){
      .swiperimg{
        height:270px;
      }
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
          {imgUrl:'https://images.unsplash.com/photo-1597345637412-9fd611e758f3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',name:'牛肉麵'},
          {imgUrl:'https://images.unsplash.com/photo-1610554675919-858d84c76d40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',name:'麻醬麵'},
          {imgUrl:'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=700&q=80',name:'榨菜肉絲麵'},
          {imgUrl:'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',name:'高麗菜水餃'},
          {imgUrl:'https://images.unsplash.com/photo-1551638059-d1fb82606c4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',name:'酸蝦大水餃'},
          {imgUrl:'https://images.unsplash.com/photo-1613744013720-4f505ce31735?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',name:'牛肉湯麵'},
        ],
        swiperOption: {
          slidesPerView: 4,
          loop : true,
          pagination: {
            el: '.swiper-pagination2',
            type: 'bullets',
            clickable: true
          },
          loop : true,
          autoplay:true,
          breakpoints:{
           320:{//当屏幕宽度大于等于320
              slidesPerView: 1,
           } ,
           414: {  //当屏幕宽度大于等于414
              slidesPerView: 2,
            },
            768: {  //当屏幕宽度大于等于768 
              slidesPerView: 3,
            },
            992: {  //当屏幕宽度大于等于1280
              slidesPerView: 4,
            }   
          }
        }
      }
    }
  }
</script>