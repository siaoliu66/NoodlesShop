<template>
  <div>
    <div class="banner"></div>
    <div class="header">
      <menubar :cartnum.sync="totalQty" :favnum.sync="totalfav"></menubar>
    </div>
    <div class="wrap">
      <div class="menu_container">
        <div class="container pt-4">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#/index">首頁</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                收藏清單
              </li>
            </ol>
          </nav>
          <h2>收藏清單</h2>
          <div class="row">
            <div
              class="col-lg-4 col-md-6 mb-4 p-3 shadow-sm"
              v-for="item in storageArray"
              :key="item.id"
            >
              <router-link class="productlink" :to="`/productpage/${item.id}`">
                <div class="card border-0">
                  <div
                    style="
                        height: 150px;
                        background-size: cover;
                        background-position: center;
                      "
                    :style="{ backgroundImage: `url(${item.imageUrl})` }"
                  ></div>
                  <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{
                      item.category
                    }}</span>
                    <h5 class="card-title">
                      {{ item.title }}
                    </h5>
                    <div class="h5" v-if="item.price">
                      {{ item.price | currency }} 元
                    </div>
                  </div>
                  <div class="card-footer">
                    <button
                      type="button"
                      class="btn btn-outline-secondary btn-sm FavBtn"
                      @click.prevent="addFavorite(item)"
                    >
                      <i
                        class="far fa-heart"
                        :class="{ fas: fav.includes(item.id) }"
                      ></i>移除清單
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm ml-auto cartBtn"
                      @click.prevent="addTocart(item.id)"
                    >
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.isLoadingitem === item.id"
                      ></i>
                      <i class="fas fa-cart-plus"></i>
                      加到購物車
                    </button>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="text-center container favNull" v-show="totalfav<1" >
              <p>
                目前沒有收藏任何商品呦 <br>
                快點去逛逛吧
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import menubar from "./topmenu";
import $ from "jquery";
export default {
  components: {
    menubar
  },
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      pagination: {},
      status: {
        isLoadingitem: ""
      },
      cart: {},
      storageArray: [],
      fav: JSON.parse(localStorage.getItem("Favorite")) || []
    };
  },
  methods: {
    addTocart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(url, { data: cart }).then(response => {
        // vm.cart = response.data.data;
        console.log(response);
        vm.status.loadingItem = "";
        vm.getcartproduct();
        $("#productModal").modal("hide");
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
    addFavorite(item) {
      const vm = this;
      if (vm.storageArray.indexOf(item) === -1) {
        vm.storageArray.push(item);
      } else {
        vm.storageArray.splice(vm.storageArray.indexOf(item), 1);
      }
      vm.fav = vm.storageArray.map(item => item.id);
      localStorage.setItem("Favorite", JSON.stringify(vm.fav));
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
<style scoped src="@/assets/customcss/news.css"></style>
<style scoped lang="scss">
.FavBtn {
  width: 100%;
}
.favNull{
    font-size: 1.8em;
    line-height: 1.2em;
    font-weight: 700;
    @media (max-width: 414px) {
      font-size: 1.6em;
      line-height: 1.2em;
    }
}
</style>
