<template>
  <swiper class="Productswiper" :options="swiperOption" >
    <swiper-slide  v-for="item in products" :key="item.id">
        <a  @click="gopath(item)" class="swiperlink"> 
        <!-- :to="{path: `${item.id}`}" -->
        <div class="swiperimg">
            <img :src="item.imageUrl" alt="">
        </div>
        <div class="swipercontent"> 
            <div class="title">
                {{ item.title }}
            </div>
            <div class="price">
                <!-- <span v-if="item.price" class="Fprice">NT {{ item.price }}</span> -->
                <span >NT {{ item.origin_price }}</span>
            </div>
        </div>
        </a> 
    </swiper-slide>
    
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";


export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props:{
      productid:{
          type: String
      },
      products:{
          type: Array 
      }
  },
  data(){
    return{
        product_id:'',
        isLoading:false,
        swiperOption:{
            pagination: {
                el: '.swiper-pagination'
            },
            autoplay:true,
            loop : true,
            spaceBetween: 10,
            breakpoints:{
                1024:{
                    slidesPerView: 4,
                },
                768:{
                    slidesPerView: 3,
                },
                640:{
                    slidesPerView: 2,
                },
                320:{
                    slidesPerView: 1,
                },
            }
        }
    }
  },
  methods:{
      gopath(item){
          this.$router.push(`/productpage/${item.id}`)
          window.location.reload()
      }
  },
};
</script>

<style lang="scss" scoped>
.Productswiper {
    width: 100%;
    height: 250px;
    .swiper-slide{
        .swiperlink{
            color: #000;
            &:hover{
                text-decoration: none;
                .swiperimg{
                    img{
                        transform: scale(1.2);
                    }
                }
            }
            .swiperimg{
                width: 100%;
                height: 180px;
                overflow:hidden;
                img{
                    width: 100%;
                    height: 100%;
                    transition: .5s;
                }
            }
            .swipercontent{
                text-align: center;
                margin: 10px;
                display: flex;
                justify-content: space-between;
                font-size: 1.25em;
                font-weight: bolder;
                @media (max-width: 768px){
                    .title{
                        font-size: 0.9em;
                    }
                }
                .price{
                    .Fprice{
                        color:#f5bc42
                    }
                    .Oprice{
                        text-decoration: line-through;
                        font-size: 0.9em;
                    }
                }
            }
        }
    }
}

</style>
