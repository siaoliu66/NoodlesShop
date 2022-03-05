<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- <alert></alert> -->
    <div class="header">
      <menubar :cartnum.sync="totalQty" :favnum.sync="totalfav"></menubar>
    </div>

    <div class="cart_container container">
      <h2 class="h2">購物車清單</h2>
      <div class="row justify-content-center cartHeader">
        <div class="step col-md-8">
          <div class="steplist">
            <div class="circle show"></div>
            <span class="text-center">確認購物車</span>
          </div>
          <div class="line"></div>
          <div class="steplist">
            <div class="circle"></div>
            <span class="text-center">填寫訂購資訊</span>
          </div>
          <div class="line"></div>
          <div class="steplist">
            <div class="circle"></div>
            <span class="text-center">確認結帳</span>
          </div>
          <div class="line"></div>
          <div class="steplist">
            <div class="circle"></div>
            <span class="text-center">訂購成功</span>
          </div>
        </div>
      </div>

      <div class="row cartContent  mb-3">
        <div class="col-md-8">
          <div class="cart-group">
            <table class="table">
              <thead class="thead-light">
                <th>商品圖片</th>
                <th>商品名稱</th>
                <th>購買數量</th>
                <th>售價</th>
                <th>總價</th>
                <th></th>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id" class="text-center">
                  <td class="align-middle">
                    <div class="cartimg" :style="{backgroundImage:`url(${item.product.imageUrl})`}"></div>
                  </td>
                  <td class="align-middle">
                    {{ item.product.title }}
                  </td>
                  <td class="align-middle count">
                      {{ item.qty }}
                 </td>
                  <td class="align-middle">
                    {{ item.product.price | currency }}
                  </td>
                  <td class="align-middle"  :class="{'text-success' : item.coupon}">
                    {{ item.final_total | currency }}
                  </td>
                  <td class="align-middle">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click.prevent="delcart(item.id)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-4 cartlist">
          <div class="card">
            <div class="card-header">
                結帳金額
            </div>
            <div class="card-body">
              <div class="card-text d-flex justify-content-between mb-2">
                <span>總計</span>
                <span>{{ cart.total | currency }}</span>
              </div>
              <div
                class="card-text d-flex justify-content-between mb-2"
              >
                <span>運費</span>
                <span>$0</span>
              </div>
              <div
                class="card-text d-flex justify-content-between mb-2" :class="{'text-success' : cart.final_total - cart.total!=0}"
              >
                <span>折扣</span>
                <span>{{ (cart.final_total - cart.total) | currency }}</span>
              </div>
              <div>
              <div  class="mb-2">優惠碼</div>
              <div class="input-group mb-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入優惠碼"
                  v-model="conpon_code"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click.prevent="addConponCode()"
                  >
                    套用優惠碼
                  </button>
                </div>
              </div>
            </div>
              <div
                class="card-text d-flex justify-content-between align-items-center"
              >
                <span>應付總額</span>
                <span class="text-danger h5">{{
                  cart.final_total | currency
                }}</span>
              </div>
              <div class="text-center cart-footer">
                <router-link class="btn btn-outline-primary" to="/menu">
                繼續點餐
                </router-link>
                <button class="btn btn-danger" @click="pushTempCarts()">
                填寫訂購資訊
                </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<style scoped src="@/assets/customcss/card.css"></style>
<style lang="scss" scoped>
    .cartimg{
            max-width: 100%;
            height: 80px;
            background-repeat: no-repeat;
            background-size: cover;
        }
</style>
<script>
import menubar from "./topmenu";
import Footer from "./footer";
import alert from "../alertMesseges";
// import $ from 'jquery'

export default {
  components: {
    menubar,
    alert,
    Footer
  },
  data() {
    return {
      cart: {},
      cart2: [],
      isLoading: false,
      storageArray: [],
      fav: JSON.parse(localStorage.getItem("Favorite")) || [],
      products: [],
      conpon_code:''
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
    delcart(id) {
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        console.log(response.data);
        this.getCarts();
        vm.isLoading = false;
      });
    },
    addConponCode() {
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/coupon`;
      const vm = this;
      const code = {
        code: vm.conpon_code
      };
      vm.isLoading = true;
      this.$http.post(api, { data: code }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.isLoading = false;
          vm.conpon_code = "";
          this.$swal({
          icon: "success",
          title: "已套用優惠券",
          showConfirmButton: false,
          timer: 1500
        });
          vm.getCarts();
        } else {
          vm.isLoading = false;
          vm.conpon_code = "";
          this.$swal({
          icon: "error",
          title: "請查明優惠券是否輸入正確",
        });
        }
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
    updateProductNum(action,product){
        this.tempcart = Object.assign({},product)
      if(action === 'add'){
        product.qty +=1
      }else if(action === 'minus' && product.qty ===1){
        this.$swal({
          text: '購買商品數量最低為 1 個',
          icon: 'warning',
        });
      }else if(action === 'minus'){
        product.qty -=1
      }
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/cart/${product.id}`;
      const vm = this;
      const cartData = {
        data: {
          product_id: product.product_id,
          qty: product.qty,
        },
      };
      vm.isLoading = true;
      this.$http.put(api,cartData).then(response => {
        console.log(response.data);
        this.getCarts();
        vm.isLoading = false;
      });
    },
    pushTempCarts(){
        sessionStorage.setItem("tempCarts", JSON.stringify(this.cart));
        this.$router.push("/buyerForm");
    }
  },
  created() {
    this.getCarts();
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
