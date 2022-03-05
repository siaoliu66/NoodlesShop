<template>
  <div>
    <intro-swiper></intro-swiper>
    <div class="header">
      <menubar :cartnum.sync="totalQty" :favnum.sync="totalfav"></menubar>
    </div>
    <div class="wrap">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#/index">首頁</a></li>
            <li class="breadcrumb-item active" aria-current="page">最新消息</li>
          </ol>
        </nav>
        <h2>最新消息</h2>
        <div class="newscontent">
          <div class="newslist">
            <img src="~@/assets/img/news.jpg" alt="" srcset="" />
            <div class="title">2021/8/7</div>
            <div class="content">
              為慶祝父親節，明日8/8(日)公休一日，請大家不要撲空。
            </div>
          </div>
          <div class="newslist">
            <img src="~@/assets/img/news.jpg" alt="" srcset="" />
            <div class="title">2021/7/24</div>
            <div class="content">高雄、台南開放餐飲內用！ 牛老大開放內用!</div>
          </div>
          <div class="newslist">
            <img src="~@/assets/img/news.jpg" alt="" srcset="" />
            <div class="title">2021/7/12</div>
            <div class="content">
              高雄、台南開放餐飲內用！夜市市場建議外帶　婚宴暫緩
            </div>
          </div>
          <div class="newslist">
            <img src="~@/assets/img/news.jpg" alt="" srcset="" />
            <div class="title">2021/4/18</div>
            <div class="content">疫情期間不開放內用，外帶訂購自取85折。</div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>
<style scoped src="@/assets/customcss/news.css"></style>

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
      cart: {},
    };
  },
  methods: {
    getcartproduct() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.cart = response.data.data;
        console.log(response.data.data.carts);
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.getcartproduct();
  },
  computed: {
    totalQty: function() {
      var totalNum = 0;
      if (this.cart.carts) {
        this.cart.carts.forEach(function(item) {
          totalNum += item.qty;
        });
      }
      return totalNum;
    }
  }
};
</script>
