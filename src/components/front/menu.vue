<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <alert></alert>
    <div class="banner"></div>
    <div class="menu_wrap">
      <div class="header">
        <menubar :cartnum.sync="totalQty" :favnum.sync="totalfav"></menubar>
      </div>
      <div class="menu_container">  
            <ul class="kind_nav">
                <li class="nav-item" :class="{active: category == 'all'}">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'all'"
                    ><i class="fas fa-globe hideicon"></i> 全部</a
                  >
                </li>
                <li class="nav-item" :class="{ active: category == 'noodles' }">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'noodles'"
                    
                    ><i class="fas fa-wheat hideicon"></i>乾麵類
                    </a
                  >
                </li>
                <li class="nav-item"
                    :class="{ active: category == 'noodlesoup' }">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'noodlesoup'"
                    ><i class="fas fa-salad hideicon"></i> 湯麵類</a
                  >
                </li>
                <li class="nav-item"
                    :class="{ active: category == 'dumplings' }">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'dumplings'"
                    ><i class="fas fa-croissant hideicon"></i> 水餃類</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'dumplingssoup'"
                    :class="{ active: category == 'dumplingssoup' }"
                    ><i class="fas fa-taco hideicon"></i> 湯餃類</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'soup'"
                    :class="{ active: category == 'soup' }"
                    ><i class="fas fa-soup hideicon"></i> 湯類</a
                  >
                </li>
              </ul>   
        <div class="container pt-4">
              <div class="row">
                <div
                  class="col-lg-4 col-md-6 mb-4 p-3 shadow-sm"
                  v-for="item in filterProducts"
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
                      <div class="h5" v-if="item.origin_price">
                           {{ item.origin_price | currency }} 元
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
                      ></i>
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
              </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<style lang="scss" scoped>
@media (max-width: 1140px) {
  .h5,
  .h6 {
    font-size: 1em;
  }
}
</style>
<script>
import menubar from "./topmenu";
import alert from '../alertMesseges'
import Footer from "./footer";

export default {
  components: {
    menubar,alert,Footer
  },
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      pagination: {},
      status: {
        isLoadingitem: "",
      },
      cart: {},
      conpon_code: "",
      category: "all",
      storageArray: [],
      fav: JSON.parse(localStorage.getItem("Favorite")) || [],
      valuenum:0,
    };
  },
  methods: {
    getproducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        // vm.products = response.data.products;
        response.data.products.forEach((data) => {
          if (data.is_enabled == 1) {
            vm.products.push(data);
          }
        });
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
        this.getLocalStorage();
      });
    },
    getproduct(id) {
      const vm = this;
      vm.$router.push(`/productpage/${id}`);
    },
    addTocart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(url, { data: cart }).then((response) => {
        console.log(response);
        vm.status.loadingItem = "";
        vm.getcartproduct();
        this.$swal({
          icon: 'success',
          title: '已加入購物車',
          showConfirmButton: false,
          timer: 1500
        })
      });
    },
    delcart(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then((response) => {
        // console.log(response.data);
        vm.getcartproduct();
        vm.isLoading = false;
      });
    },
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
    addFavorite(item) {
      const vm = this;
      if (vm.storageArray.indexOf(item) === -1) {
        vm.storageArray.push(item);
        this.$swal({
          icon: 'success',
          title: '已加入收藏清單',
          showConfirmButton: false,
          timer: 1500
        })
        // console.log("已加入我的最愛")
      } else {
        vm.storageArray.splice(vm.storageArray.indexOf(item), 1);
        this.$swal({
          icon: 'warning',
          title: '已從清單中移除',
          showConfirmButton: true,
        })
      }
      vm.fav = vm.storageArray.map((item) => item.id);
      localStorage.setItem("Favorite", JSON.stringify(vm.fav));
    },
    getLocalStorage() {
      const vm = this;
      vm.fav.forEach((item) => {
        vm.products.forEach((data) => {
          if (item === data.id) {
            vm.storageArray.push(data);
          }
        });
      });
    },
  },
  created() {
    this.getproducts();
    this.getcartproduct();
  },
  computed: {
    filterProducts: function () {
      if (this.category == "all") {
        return this.products;
      } else if (this.category == "noodles") {
        var newsproducts = [];
        this.products.forEach(function (item) {
          if (item.category == "乾麵類") {
            newsproducts.push(item);
          }
        });
        return newsproducts;
      } else if (this.category == "noodlesoup") {
        var newsproducts = [];
        this.products.forEach(function (item) {
          if (item.category == "湯麵類") {
            newsproducts.push(item);
          }
        });
        return newsproducts;
      } else if (this.category == "dumplings") {
        var newsproducts = [];
        this.products.forEach(function (item) {
          if (item.category == "水餃類") {
            newsproducts.push(item);
          }
        });
        return newsproducts;
      } else if (this.category == "dumplingssoup") {
        var newsproducts = [];
        this.products.forEach(function (item) {
          if (item.category == "湯餃類") {
            newsproducts.push(item);
          }
        });
        return newsproducts;
      }else if (this.category == "soup") {
        var newsproducts = [];
        this.products.forEach(function (item) {
          if (item.category == "湯類") {
            newsproducts.push(item);
          }
        });
        return newsproducts;
      }
    },
    totalQty: function () {
      var totalNum = 0;
      if (this.cart.carts) {
        this.cart.carts.forEach(function (item) {
          totalNum += item.qty;
        });
      }
      this.valuenum = totalNum;
      return totalNum;
    },
    totalfav: function () {
      var totalfav = 0;
      if (this.storageArray) {
        totalfav = this.storageArray.length;
      }
      return totalfav;
    },
  },
};
</script>