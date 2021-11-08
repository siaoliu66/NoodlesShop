<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <alert></alert>
    <div class="web">
      <div class="header">
        <menubar />
      </div>
      <div class="menu_container">
        <!-- 購物車 -->
        <div class="cart">
          <a href="#/cart" class="">
            <span class="cartsnum">{{ totalQty }}</span>
            <i class="fas fa-shopping-basket"></i>
          </a>
        </div>
        <!-- 我的最愛 -->
        <div class="cart" style="bottom: 70px">
          <a
            href="#/favorite"
            class=""
            @click="category = 'fav'"
            :class="{ active: category == 'fav' }"
          >
            <span class="cartsnum">{{ totalfav }}</span>
            <i class="fas fa-heart"></i>
          </a>
        </div>

        <div class="container pt-4">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#/index">首頁</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                美味菜單
              </li>
            </ol>
          </nav>
          <div class="row">
            <div class=" col-md-3 col-lg-2">
              <!-- 手機版分類選單 -->
              <div class="form-mobile">
                <select
                  id="FormControlSelect1"
                  class="form-control btn-secondary"
                  v-model="category"
                >
                  <option value="all" @click="category = 'all'">全部</option>
                  <option value="noodles" @click="category = 'noodles'">麵類</option>
                  <option value="soup" @click="category = 'soup'">湯類</option>
                  <option value="dumplings" @click="category = 'dumplings'">水餃類</option>
                  <option value="vagetable" @click="category = 'vagetable'">滷味小菜</option>
                  <label  for="FormControlSelect1">課程分類</label>
                  </select>              
                </div>
                <!-- 手機版分類選單結束 -->
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'all'"
                    :class="{ active: category == 'all' }"
                    >全部</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'noodles'"
                    :class="{ active: category == 'noodles' }"
                    >麵類</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'soup'"
                    :class="{ active: category == 'soup' }"
                    >湯類</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'dumplings'"
                    :class="{ active: category == 'dumplings' }"
                    >水餃類</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'vagetable'"
                    :class="{ active: category == 'vagetable' }"
                    >滷味小菜</a
                  >
                </li>
              </ul>
            </div>
            <div class=" col-md-9 col-lg-10 ml-sm-auto px-md-4">
              <div class="row mt-4">
                <div
                  class="col-lg-4 col-md-6 mb-4"
                  v-for="item in filterProducts"
                  :key="item.id"
                >
                  <div class="card border-0 shadow-sm">
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
                        <a href="#" class="text-dark">{{ item.title }}</a>
                      </h5>
                      <p class="card-text">{{ item.content }}</p>
                      <div
                        class="
                          d-flex
                          justify-content-between
                          align-items-baseline
                        "
                      >
                        <div class="h5" v-if="!item.price">
                          {{ item.origin_price | currency }} 元
                        </div>
                        <del class="h6" v-if="item.price"
                          >原價 {{ item.origin_price | currency }} 元</del
                        >
                        <div class="h5" v-if="item.price">
                          現在只要 {{ item.price | currency }} 元
                        </div>
                      </div>
                    </div>
                    <div class="card-footer d-flex">
                      <button
                        type="button"
                        class="btn btn-outline-secondary btn-sm"
                        @click.prevent="getproduct(item.id)"
                      >
                        <i
                          class="fas fa-spinner fa-spin"
                          v-if="status.isLoadingitem === item.id"
                        ></i>
                        查看更多
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm ml-auto"
                        @click.prevent="addTocart(item.id)"
                      >
                        <i
                          class="fas fa-spinner fa-spin"
                          v-if="status.isLoadingitem === item.id"
                        ></i>
                        加到購物車
                      </button>
                    </div>
                    <a class="fav" href="#" @click.prevent="addFavorite(item)">
                      <i
                        class="far fa-heart"
                        :class="{ fas: fav.includes(item.id) }"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nav {
  margin-top: 30px;
  .nav-item {
    font-size: 1.3em;
  }
  .active {
    color: #fff;
    background-color: #007bff;
  }
}
span.badge {
  font-size: 1em;
}
.img-fluid {
  height: 310px;
  background-size: cover;
  background-position: center center;
}
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
import $ from "jquery";

export default {
  components: {
    menubar,alert
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
        console.log(vm.products);
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
        // vm.cart = response.data.data;
        console.log(response);
        vm.status.loadingItem = "";
        vm.getcartproduct();
        $("#productModal").modal("hide");
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
        this.$bus.$emit('message:push',"已加入我的最愛",'success')
        // console.log("已加入我的最愛")
      } else {
        vm.storageArray.splice(vm.storageArray.indexOf(item), 1);
        this.$bus.$emit('message:push',"已從我的最愛移除",'warning')
      }
      vm.fav = vm.storageArray.map((item) => item.id);
      localStorage.setItem("Favorite", JSON.stringify(vm.fav));
    },
    getLocalStorage() {
      const vm = this;
      console.log(this.products);
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
          if (item.category == "麵類") {
            newsproducts.push(item);
          }
        });
        return newsproducts;
      } else if (this.category == "soup") {
        var newsproducts = [];
        this.products.forEach(function (item) {
          if (item.category == "湯類") {
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
      } else if (this.category == "vagetable") {
        var newsproducts = [];
        this.products.forEach(function (item) {
          if (item.category == "滷味小菜") {
            newsproducts.push(item);
          }
        });
        return newsproducts;
      } else {
        return this.storageArray;
      }
    },
    totalQty: function () {
      var totalNum = 0;
      if (this.cart.carts) {
        this.cart.carts.forEach(function (item) {
          totalNum += item.qty;
        });
      }
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