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
            <div class="circle show"></div>
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
      <div class="row justify-content-center cartContent mb-3">
        <div class="cart-group col-lg-8">
          <div class="card-header">
            顧客資料
          </div>
          <div class="card-body">
            <ValidationObserver v-slot="{ invalid }">
              <ValidationProvider rules="required" v-slot="{  errors ,classes  }">
                <div class="form-group">
                  <label for="username" class="m-1">顧客姓名*</label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    id="username"
                    v-model="form.user.name"
                    placeholder="輸入姓名" :class="classes"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider
                rules="required|cellphone"
                v-slot="{ errors ,classes }"
              >
                <div class="form-group">
                  <label for="cellphone" class="m-1">手機號碼*</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="usertel"
                    maxlength="10"
                    v-model="form.user.tel"
                    placeholder="請輸入電話" :class="classes"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors ,classes }">
                <div class="form-group">
                  <label for="useremail" class="m-1">聯絡信箱*</label>
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    id="useremail"
                    v-model="form.user.email"
                    placeholder="請輸入 Email"
                    required  :class="classes"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors ,classes }">
                <div class="form-group">
                  <label for="useraddress" class="m-1">收件地址*</label>
                  <input
                    type="text"
                    class="form-control"
                    name="address"
                    id="useraddress"
                    v-model="form.user.address"
                    placeholder="請輸入地址" :class="classes"
                  />
                  <span class="text-danger"  v-if="errors"
                    >地址欄位不得留空</span
                  >
                </div>
              </ValidationProvider>
              <div class="form-group">
                  <label for="useraddress" class="m-1">備註</label>
                  <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"
                  placeholder="有什麼想告訴賣家的嗎?"></textarea>
                </div>
              <div class="text-center footlink">
                <router-link class="btn btn-primary" to="/cart">
                  回到購物車
                </router-link>
                <button
                  class="btn btn-success"
                  @click="Nextpage()"
                  :disabled="invalid"
                >
                  下一步
                </button>
              </div>
            </ValidationObserver>
          </div>
        </div>
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
      products: [],
      cart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
          status:'未確認'
        },
        message: ""
      },
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
    Nextpage() {
      sessionStorage.setItem("tempOrder", JSON.stringify(this.form));
      this.$router.push("/orderConfirm");
    },
    renderTempOrder() {
      const hasUser = sessionStorage.getItem("tempOrder");
      if (hasUser) {
        this.form.user = JSON.parse(hasUser).user;
        this.form.message = JSON.parse(hasUser).message;
      }
    }
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
<style scoped lang="scss">
.footlink {
  margin-top: 20px;
}
.cart_container {
    .cartContent{
        .col-lg-8{
            padding: 0;
        }
        .cart-group {
            border: 1px solid #ced4da !important;
        }
    }
}

</style>
