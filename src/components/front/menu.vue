<template>
  <div>
    <loading :active.sync="isLoading"></loading>
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
        <div class="container pt-4">
          <div class="row">
            <div class="col-md-3 col-lg-2">
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
            <div class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              <div class="row mt-4">
                <div
                  class="col-md-4 mb-4"
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
                        class="d-flex justify-content-between align-items-baseline"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- productModal start -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.category }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                {{ product.origin_price | currency }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price | currency }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price | currency }} 元
              </div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="addTocart(product.id, product.num)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- productModal final -->
  </div>
</template>

  <style lang="scss" scoped>
.web {
  background-color: #c4cbcf;
  min-height: 100vh !important;
}
.menu_container {
  margin-top: 64px;
}
.nav {
  margin-top: 30px;
}
.nav-item {
  font-size: 1.3em;
}
.nav-item .active {
  color: #fff;
  background-color: #007bff;
}
.cart {
  border-radius: 50%;
  position: fixed;
  bottom: 10%;
  right: 3%;
  background-color: #fff;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 40px;
}
.cartsnum {
  position: absolute;
  color: #fff;
  font-size: 0.875rem;
  background-color: #dc3545;
  right: -7px;
  top: -5px;
  line-height: 1.5rem;
  min-width: 1.5rem;
  padding: 0 4px;
  border-radius: 0.725rem;
}
.fa-shopping-basket {
  font-size: 2em;
  line-height: 60px;
}
</style>
<script>
import menubar from "./topmenu";
import $ from "jquery";

export default {
  components: {
    menubar,
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
    };
  },
  methods: {
    getproducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.products = response.data.products;
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
    getproduct(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        $("#productModal").modal("show");
        console.log(response);
        vm.status.loadingItem = "";
        vm.product.num = 1; //預設數量
      });
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
    addConponCode() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/coupon`;
      const code = {
        code: vm.conpon_code,
      };
      vm.isLoading = true;
      this.$http.post(url, { data: code }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.isLoading = false;
          vm.conpon_code = "";
          vm.getcartproduct();
        } else {
          vm.isLoading = false;
          vm.conpon_code = "";
          this.$bus.$emit("message:push", response.data.message, "warning");
        }
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
      } else {
        var newsproducts = [];
        this.products.forEach(function (item) {
          if (item.category == "滷味小菜類") {
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
      return totalNum;
    },
  },
};
</script>