<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="header">
      <menubar :cartnum.sync="totalQty" :favnum.sync="totalfav"></menubar>
    </div>
    <div class="cart_container container">
      <h2 class="h2">購物車清單</h2>
      <div class="row justify-content-center cartHeader">
        <div class="step col-md-8">
          <div class="steplist">
            <div class="circle"></div>
            <span class="text-center">確認購物車</span>
          </div>
          <div class="line"></div>
          <div class="steplist">
            <div class="circle"></div>
            <span class="text-center">填寫訂購資訊</span>
          </div>
          <div class="line"></div>
          <div class="steplist">
            <div class="circle show"></div>
            <span class="text-center">確認結帳</span>
          </div>
          <div class="line"></div>
          <div class="steplist">
            <div class="circle"></div>
            <span class="text-center">訂購成功</span>
          </div>
        </div>
      </div>
      <div class="row justify-content-around cartContent mb-3">
        <div class="cart-group col-6 product">
            <p class="mb-3 title">購買商品</p>
            <ul >
                <li v-for="item in cart.carts" :key="item.id" class="border mb-2 p-2">
                    <div class="row">
                        <div class="col-5">
                            <div class="cartimg" :style="{backgroundImage:`url(${item.product.imageUrl})`}"></div>
                        </div>
                        <div class="col-7 text">
                            <p>{{item.product.title}}</p>
                            <p>數量: {{item.qty}}</p>
                            <p>總價: {{item.final_total}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="cart-group col-5 order">
            <p class="mb-3 title">訂購資訊</p>
            <div class="form-group">
                <label for="cellphone" class="m-1">顧客姓名</label>
                <input
                  type="tel"
                  class="form-control"
                  id="usertel"
                  v-model="pushOrder.user.name"
                  disabled
                />
            </div>
            <div class="form-group">
                <label for="cellphone" class="m-1">手機號碼</label>
                <input
                  type="tel"
                  class="form-control"
                  id="usertel"
                  v-model="pushOrder.user.tel"
                  disabled
                />
            </div>
            <div class="form-group">
                <label for="cellphone" class="m-1">聯絡信箱</label>
                <input
                  type="tel"
                  class="form-control"
                  id="usertel"
                  v-model="pushOrder.user.email"
                  disabled
                />
            </div>
            <div class="form-group">
                <label for="cellphone" class="m-1">收件地址</label>
                <input
                  type="tel"
                  class="form-control"
                  id="usertel"
                  v-model="pushOrder.user.address"
                  disabled
                />
            </div>
            <div class="form-group">
                <label for="useraddress" class="m-1">備註</label>
                <textarea name="" id="comment" class="form-control" rows="2" v-model="pushOrder.message" disabled></textarea>
            </div>
            <div class="mt-3 final_price">
                <div>應付總額</div>
                <div>{{cart.final_total | currency}}</div>
            </div>
        </div>
      </div>
      <div class="text-center footlink mb-3">
        <router-link class="btn btn-primary" to="/buyerForm">
            返回修改
        </router-link>
        <button class="btn btn-success" @click="createOrder()">
            確認下單
        </button>
    </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import menubar from "./topmenu";
import Footer from "./footer";
export default {
  components: {
    menubar,Footer
  },
  data() {
    return {
      isLoading: false,
      storageArray: [],
      fav: JSON.parse(localStorage.getItem("Favorite")) || [],
      pushOrder: '',
      products: [],
      cart: {},
      conpon_code: ""
    };
  },
  methods: {
    getCarts() {
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.cart = response.data.data;
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
          }
        });
        // console.log(vm.products)
        vm.isLoading = false;
        this.getLocalStorage();
      });
    },
    getLocalStorage() {
      const vm = this;
      //   console.log(this.products);
      vm.fav.forEach(item => {
        vm.products.forEach(data => {
          if (item === data.id) {
            vm.storageArray.push(data);
          }
        });
      });
    },
    createOrder() {
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/order`;
      const vm = this;
      vm.isLoading = true;
      this.$http.post(api, { data: vm.pushOrder }).then(response => {
        console.log("訂單已建立", response);
        if (response.data.success) {
          vm.isLoading = false;
          vm.$router.push(`/checkout/${response.data.orderId}`);
        } else {
          console.log(response.data.message);
          vm.isLoading = false;
        }
        this.$emit("message:push", response.data.message, "warning");
      });
    },
    returnToForm() {
      this.$emit('emit-order', this.pushOrder);
      this.$router.push('/buyerForm');
    },
    renderTempOrder() {
      const tempOrder = sessionStorage.getItem('tempOrder');
      this.pushOrder = JSON.parse(tempOrder);
      const tempCarts = sessionStorage.getItem('tempCarts');
      this.pushCarts = JSON.parse(tempCarts);
    },
  },
  created() {
    this.getCarts();
    this.getproducts();
    this.renderTempOrder();
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
<style scoped src="@/assets/customcss/card.css"></style>

