<template>
  <div>
    <!-- <intro-swiper></intro-swiper> -->
    <div class="banner"></div>
    <div class="header">
      <menubar :cartnum.sync="totalQty" :favnum.sync="totalfav"></menubar>
    </div>
    <div class="wrap">
      <div class="container pt-4">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#/index">首頁</a></li>
            <li class="breadcrumb-item active" aria-current="page">關於我們</li>
          </ol>
        </nav>
        <h2>關於我們</h2>
        <div class="intro">
          <h3>牛老大的故事</h3>
          <div class="intro-1">
            <div class="introText">
              <p>
                牛老大從食材出發，強調本真，老師傅使用多種材料熬製的高湯，清爽卻不失濃郁，再融入香菇湯底，使湯汁香氣、深度更上一層樓。
              </p>
              <p>
                民以食為天，遵循古法手工，從和麵糰開始堅持手工製作麵條、水餃皮，堅持始終如一，煮出熟悉的味道，美味飄香千萬家。
              </p>
              <p>
                從1996年開始營業，一代傳承一代，守護美好古早味，並試圖創新新滋味，期待揚名高雄。
              </p>
            </div>
            <div class="img">
              <img
                src="@/assets/img/dumplings.jpg"
              />
            </div>
          </div>
        </div>
        <div class="contact">
          <h3>聯絡我們</h3>
          <div class="contact-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.9284202400704!2d120.39250181534818!3d22.506868641051348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3471e27f00000001%3A0x4c7b878e0c0a328a!2z54mb6ICB5aSn54mb6IKJ6bq1!5e0!3m2!1szh-TW!2stw!4v1621824013502!5m2!1szh-TW!2stw"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
            <div class="contactText">
              <div class="contactTitle">商家店址</div>
              <p>高雄市林園區忠孝九路13號</p>
              <div class="contactTitle">訂餐電話</div>
              <p>07-6461235</p>
              <div class="contactTitle">營業時間</div>
              <p>10:30~21:00 周一店休</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
    Footer,
  },
  data() {
    return {
      cart: {},
      products: [],
      storageArray: [],
      fav: JSON.parse(localStorage.getItem("Favorite")) || []
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
    },
        getproducts() {
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        response.data.products.forEach((data) => {
          if (data.is_enabled == 1 && data.id !== vm.product_id) {
            vm.products.push(data);
            // console.log(data)
          }
        });
        console.log(vm.products)
        vm.isLoading = false;
        this.getLocalStorage();
      });
    },
    getLocalStorage() {
      const vm = this;
      console.log(this.products);
      vm.fav.forEach(item => {
        vm.products.forEach(data => {
          if (item === data.id) {
            vm.storageArray.push(data);
          }
        });
      });
    }
  },
  created() {
    this.getcartproduct();
    this.getproducts();
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