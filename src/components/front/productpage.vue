<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <alert></alert>
    <div class="product_wrap">
      <div class="header">
        <menubar :cartnum.sync="totalQty" :favnum.sync="totalfav"></menubar>
      </div>
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#/index">首頁</a></li>
            <li class="breadcrumb-item active" aria-current="page">
              <a href="#/menu"> 美味菜單</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ product.title }}
            </li>
          </ol>
        </nav>
        <div class="product">
          <div class="row">
            <div class="col-md-7">
              <div
                :style="{ backgroundImage: `url( ${product.imageUrl})` }"
                class="img-fluid productImg"
                alt=""
              ></div>
            </div>
            <div class="producttext col-md-5 mt-3">
              <p class="productcat badge badge-secondary mb-3">
                {{ product.category }}
              </p>
              <p class="producttitle mb-4">{{ product.title }}</p>
              <p class="productdes mb-3">{{ product.description }}</p>
              <div class="d-flex justify-content-top align-items-center">
                <div class="disprice">
                  NT
                  <span class="price" v-if="!product.price"
                    >{{ product.origin_price }}
                  </span>
                  <span class="price">{{ product.price }} </span>
                </div>
              </div>
              <div class="input-group mb-3 count">
                <button class="btn btn-outline-secondary remove" type="button" @click="updateProductNum('minus')"><i class="far fa-minus"></i></button>
                <input type="number" class="form-control text-center" placeholder="" v-model="qty">
                <button class="btn btn-outline-secondary add" type="button" @click="updateProductNum('add')"><i class="fas fa-plus"></i></button>
            </div>
              <div class="d-flex  align-items-baseline ">
                <button
                  type="button"
                  class="btn btn-danger addcart"
                  @click.prevent="addTocart(product.id, qty)"
                >
                  <i class="fas fa-cart-plus"></i>
                  加到購物車
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary FavBtn"
                  @click.prevent="addFavorite(product)"
                >
                  <i
                    class="far fa-heart"
                    :class="{ fas: fav.includes(product.id) }"
                  ></i
                  >加入收藏
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="rommand">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="h4">您可能會喜歡的</div>
            <a href="#/menu" class="btn btn-outline-secondary btn-sm">
              回到商品頁
            </a>
          </div>
          <div class="row container">
            <productswiper :productid="product_id" :products="products" />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import menubar from "./topmenu";
import alert from "../alertMesseges";
import Footer from "./footer";
import productswiper from "../product_swiper";

export default {
  components: {
    menubar,
    alert,
    Footer,
    productswiper
  },
  data() {
    return {
      product_id: "",
      category: "",
      product: {},
      products: [],
      cart: {},
      qty: 1,
      isLoading: false,
      status: {
        isLoadingitem: ""
      },
      fav: JSON.parse(localStorage.getItem("Favorite")) || [],
      storageArray: []
    };
  },
  methods: {
    getproduct() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/product/${vm.product_id}`;
      this.$http.get(url).then(response => {
        vm.product = response.data.product;
        console.log(response);
        vm.status.loadingItem = "";
        vm.product.num = 1; //預設數量
        vm.category = vm.product.category;
      });
      vm.isLoading = false;
      this.getproducts();
    },
    addTocart(id, qty) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty: qty
      };
      this.$http.post(url, { data: cart }).then(response => {
        vm.status.loadingItem = "";
        vm.getcartproduct();
        this.$swal({
          icon: "success",
          title: "已加入購物車",
          showConfirmButton: false,
          timer: 1500
        });
      });
    },
    getcartproduct() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.cart = response.data.data;
        // console.log(response.data.data.carts);
        vm.isLoading = false;
      });
    },
    getproducts() {
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        response.data.products.forEach(data => {
          if (data.is_enabled == 1 && data.id !== vm.product_id) {
            vm.products.push(data);
            // console.log(data)
          }
        });
        console.log(vm.products);
        vm.isLoading = false;
        this.getLocalStorage();
      });
    },
    addFavorite(item) {
      const vm = this;
      if (vm.storageArray.indexOf(item) === -1) {
        vm.storageArray.push(item);
        this.$swal({
          icon: "success",
          title: "已加入收藏清單",
          showConfirmButton: false,
          timer: 1500
        });
        // console.log("已加入我的最愛")
      } else {
        vm.storageArray.splice(vm.storageArray.indexOf(item), 1);
        this.$swal({
          icon: "warning",
          title: "已從清單中移除",
          showConfirmButton: true
        });
      }
      vm.fav = vm.storageArray.map(item => item.id);
      localStorage.setItem("Favorite", JSON.stringify(vm.fav));
    },
    getLocalStorage() {
      const vm = this;
      // console.log(this.products);
      vm.fav.forEach(item => {
        vm.products.forEach(data => {
          if (item === data.id) {
            vm.storageArray.push(data);
          }
        });
      });
    },
    updateProductNum(action){
      if(action === 'add'){
        this.qty +=1
      }else if(action === 'minus' && this.qty ===1){
        this.$swal({
          text: '購買商品數量最低為 1 個',
          icon: 'warning',
        });
      }else if(action === 'minus'){
        this.qty -=1
      }
    }
  },
  computed: {
    filterproducts: function() {
      if (this.products.length != 0) {
        return this.products;
      } else {
        const newsproducts = [];
        const url = `${process.env.APIPATH}/api/${process.env.APIID}/product/${vm.product_id}`;
        this.$http.get(url).then(response => {
          response.data.products.forEach(data => {
            if (data.is_enabled == 1) {
              newsproducts.push(data);
            }
          });
          return newsproducts;
        });
      }
    }
  },
  created() {
    this.product_id = this.$route.params.product_id;
    this.getproduct();
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
    },
    totalfav: function() {
      var totalfav = 0;
      if (this.storageArray) {
        totalfav = this.storageArray.length;
      }
      return totalfav;
    },
  }
};
</script>

<style lang="scss" scoped>
.h4 {
  margin-bottom: 0;
}
.disprice {
  font-size: 2em;
  margin-bottom: 10px;
  color: #f3a908;
}
.total {
  margin-right: 10px;
  font-size: 1.1em;
}
@media (max-width: 414px) {
  .rommand {
    .row {
      .col-md-3 {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
