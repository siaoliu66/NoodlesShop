<template>
  <div>
    <intro-swiper></intro-swiper>
    <div class="header">
      <menubar :cartnum.sync="totalQty" :favnum.sync="totalfav"></menubar>
    </div>
    <div class="wrap">
      <div class="container">
        <div class="about infobox">
          <div class="content">
            <div class="heading">
              <p class="num">01</p>
              <p class="title">About</p>
            </div>
            <p class="text">
              牛老大從食材出發，強調本真，<br />選用天然醬料，才能吃的安全放心。<br />
              每天早起熬煮，遵循古法手工。<br />用心烹調，值得你的等待。
            </p>
          </div>
          <div class="img-bg">
            <img
              src="https://cdn.pixabay.com/photo/2020/01/31/07/26/chef-4807317_960_720.jpg"
              alt=""
            />
          </div>
        </div>
        <div class="recommend infobox">
          <div class="content">
            <div class="heading">
              <p class="num">02</p>
              <p class="title">Recommend</p>
            </div>
            <p class="text">
              光看照片絕對無法得知他的美味，趕快來下單吧!!
            </p>
            <div class="text-center">
              <router-link class="go btn btn-outline-dark mt-5" to="/menu"
                >來去點餐</router-link
              >
            </div>
          </div>
          <div class="img-bg">
            <swiper2 />
          </div>
        </div>
        <div class="news infobox">
          <div class="content">
            <div class="heading">
              <p class="num">03</p>
              <p class="title">精選新聞</p>
            </div>
          </div>
          <div class="img-bg">
            <div class="slide">
              <transition-group name="flip-list" tag="ul" class="slide-list">
                <li v-for="item in slideData" :key="item.id">
                  <article class="slide-article">
                    <img :src="newsdata[item.ref].imgUrl" alt="" />
                    <p class="newstext">{{ newsdata[item.ref].title }}</p>
                    <p class="date">{{ newsdata[item.ref].date }}</p>
                  </article>
                </li>
              </transition-group>
              <div class="slide-ctrl">
                <div class="slide-prev" @click="slideCtrl(-1)">&lt;</div>
                <div class="slide-next" @click="slideCtrl(1)">&gt;</div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="coupon">
            <div class="container">
               <div class="couponText">
                <div class="title">
                    訂閱我們
                </div>
                <div class="content">
                    現在訂閱即享有85折優惠卷喔~
                </div>
            </div>
            <div class="inputArea">
                <input type="email" class="email" placeholder="請輸入電子信箱" v-model="emailValue">
                <button type="button" class="send" @click="IsEmail(emailValue)">送出</button>
            </div> 
            </div>
            
        </div>
        
      <Footer></Footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  .more {
    position: absolute;
    bottom: 8%;
    left: 50%;
    color: #a46843;
    border-color: #a46843;
    transform: translateX(-50%);
    &:hover {
      color: #fff;
      background-color: #a46843;
    }
  }
}
/* slide ctrl */
.slide-prev,
.slide-next {
  user-select: none;
  display: inline-block;
  background-color: #000;
  color: #fff;
  padding: 5px 15px;
  border-radius: 50px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &:hover {
    color: #ff0;
  }
   @media screen and (max-width: 414px) {
         top: 40%;
  }
}
.slide-prev{
    left: 10px;
}
.slide-next{
    right: 10px;
}
/* slide */
.slide {
  width: 100%;
  overflow: hidden;
}
.slide-list {
  display: flex;
}
.slide-list li {
  position: relative;
  flex: calc(100% / 2) 0 0;
  left: calc(-100% / 2 * 1.5);
  @media screen and (max-width: 991px) {
    &{
      flex: calc(100% / 1) 0 0;
      left: calc(-100% / 1 );
    }
  }
  &:first-child,
  &:last-child {
    z-index: -1;
    opacity: 0;
  }
}
.slide-article {
  border: 1px solid #eee;
  padding-top: 10px;
  margin: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
  .newstext{
      margin-top: 15px;
      margin-bottom: 10px;
  }
}
.flip-list-move {
  transition: transform 0.8s;
}
</style>

<script>
import menubar from "./topmenu";
import swiper2 from "../swiper2";
import Footer from "./footer";

// import $ from "jquery";
export default {
  components: {
    menubar,
    swiper2,
    Footer
  },
  data() {
    return {
      slideData: [],
      newsdata: [
        {
          title: "為慶祝父親節，明日8/8(日)公休一日，請大家不要撲空。",
          date: "2021/8/7",
          imgUrl:
            "https://cdn.pixabay.com/photo/2018/03/12/13/35/table-3219660_960_720.jpg"
        },
        {
          title: "高雄、台南開放餐飲內用！ 牛老大開放內用!",
          date: "2021/10/7",
          imgUrl:
            "https://cdn.pixabay.com/photo/2018/03/12/13/35/table-3219660_960_720.jpg"
        },
        {
          title: "疫情期間不開放內用，外帶訂購自取85折。",
          date: "2022/1/7",
          imgUrl:
            "https://cdn.pixabay.com/photo/2018/03/12/13/35/table-3219660_960_720.jpg"
        }
      ],
      clickWait: false,
      timer: {},
      emailValue:'',
      cart: {},
      storageArray: [],
      products: [],
      fav: JSON.parse(localStorage.getItem("Favorite")) || [],
    };
  },
  created() {
    this.getcartproduct();
  },
  methods: {
    getcartproduct() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data;
        // console.log(response.data.data.carts);
        vm.isLoading = false;
      });
    },
    slideCtrl(slidesToShow = 1) {
      if (this.clickWait) {
        return;
      }
      this.stopTime();
      this.clickWait = true;
      if (slidesToShow > 0) {
        const shiftItem = this.slideData.shift();
        this.slideData.push(shiftItem);
        this.setTime();
        return;
      }
      if (slidesToShow < 0) {
        const shiftItem = this.slideData.pop();
        this.slideData.unshift(shiftItem);
        this.setTime();
      }
    },
    setTime() {
      this.timer = setTimeout(() => {
        this.clickWait = false;
      }, 500);
    },
    stopTime() {
      clearInterval(this.timer);
    },
    IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test(email)) {
             this.$swal({
              icon: 'error',
              title: 'Oops...',
              text: '信箱格是錯誤，請重新輸入',
              timer: 3000,
            });
        }else{
            this.emailValue = ''
            this.$swal({
              icon: 'success',
              title: '訂閱成功',
              timer: 1500,
            });
        }
    },
    getproducts() {
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        response.data.products.forEach(data => {
          if (data.is_enabled == 1 && data.id !== vm.product_id) {
            vm.products.push(data);
          }
        });
        vm.isLoading = false;
        this.getLocalStorage();
      });
    },
    getLocalStorage() {
      const vm = this;
      vm.fav.forEach(item => {
        vm.products.forEach(data => {
          if (item === data.id) {
            vm.storageArray.push(data);
          }
        });
      });
    },
  },
  mounted() {
    /* 將原始資料擴展 */
    for (let i = 0; i < this.newsdata.length * 2; i++) {
      let obj = {};
      obj.id = i;
      obj.ref = i % this.newsdata.length;
      this.slideData.push(obj);
    }
  },
  created: function () {
    this.getcartproduct();
    this.getproducts();
  },
  computed:{
    totalQty: function () {
      var totalNum = 0;
      if (this.cart.carts) {
        this.cart.carts.forEach(function (item) {
          totalNum += item.qty;
        });
      }
      return totalNum;
    },
    totalfav: function() {
      var totalfav = 0;
      if (this.storageArray) {
        totalfav = this.storageArray.length;
      }
      return totalfav;
    }
  }
};
</script>
