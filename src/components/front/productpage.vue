<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <alert></alert>
    <div class="web">
      <div class="header">
        <menubar />
      </div>
      <div class="container">
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
          <p class="productcat badge badge-secondary mb-3">{{product.category}}</p>
          <p class="producttitle mb-3">{{ product.title }}</p>
          <p class="productdes mb-3">商品描訴</p>
          <p class="productdestext mb-5">{{ product.description }}</p>
          <div class="d-flex justify-content-end align-items-baseline">
            <div class="h4" v-if="!product.price">
              {{ product.origin_price | currency }} 元
            </div>
            <del class="mr-3" v-if="product.price"
              >原價 {{ product.origin_price | currency }} 元</del
            >
            <div class="disprice" v-if="product.price">
              優惠價 <span class="price">{{ product.price | currency }} </span>
            </div>
          </div>
          <select name="" class="form-control mb-2" v-model="product.num">
            <option :value="num" v-for="num in 10" :key="num">
              選購 {{ num }} {{ product.unit }}
            </option>
          </select>
          <div class="d-flex justify-content-end align-items-baseline">
            <div class="total">
              合計 {{ product.price*product.num | currency }} 元
            </div>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm "
              @click.prevent="addTocart(product.id,product.num)"
            >
              <i class="fas fa-cart-plus"></i>
              加到購物車
            </button>
          </div>
        </div>
        </div>
      </div>
        <div class="rommand">
          <div class="d-flex justify-content-between align-items-baseline mb-3">
            <div class="h4">您可能會喜歡的</div>
            <a
              href="#/menu"
              class="btn btn-outline-secondary"
            >
              回到商品頁
            </a>
        </div>
        <div class="row">
          <div class="col-md-3" v-for="item in products" :key="item.id">
            <router-link :to="{path: `${item.id}`}" class="active">
              <div class="card">
                <div class="img"
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                    ></div>
                <div class="card-body">
                  <p class="card-text">{{ item.title }}</p>
                  <p class="productcat badge badge-secondary mb-3">{{item.category}}</p>
                </div>
              </div>
            
            </router-link>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menubar from "./topmenu";
import alert from "../alertMesseges";
export default {
  components: {
    menubar,alert
  },
  data() {
    return {
      product_id: "",
      category: "",
      product: {},
      products: [],
      cart: {},
      isLoading: false,
      status: {
        isLoadingitem: "",
      },
    };
  },
  methods: {
    getproduct() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/product/${vm.product_id}`;
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        console.log(response);
        vm.status.loadingItem = "";
        vm.product.num = 1; //預設數量
        vm.category = vm.product.category
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
        qty: qty,
      };
      this.$http.post(url, { data: cart }).then((response) => {
        vm.status.loadingItem = "";
        // vm.getcartproduct();
        this.$bus.$emit('message:push',"已加入購物車",'success')
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
     getproducts() {
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/products/all`;
      const vm = this;
      console.log(vm.category)
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        response.data.products.forEach((data) => {
          if (data.is_enabled == 1 &&　data.category == vm.category && data.id !== vm.product_id) {
            vm.products.push(data);
            console.log(data)
          }
        });
        console.log(vm.products)
        vm.isLoading = false;
      });
    },
    gootherproduct(id){
      const vm = this;
      vm.$router.push(`${id}`);
    }
  },
  created() {
    this.product_id = this.$route.params.product_id;
    console.log(this.$route.path)
    this.getproduct();
    this.getproducts();
  },
    watch: {
    // 监听路由变化
    "$route.path": function(newVal, oldVal) {
      if(newVal !== oldVal){
        console.log(`new_path = ${newVal}, old_path = ${oldVal}`);
        const vm = this;
        vm.$router.replace(`${newVal}`);
        this.$router.go(0)
      }
    }
  }

};
</script>

<style lang="scss" scoped>
.price{
    color:#ee4863
  }
  .disprice{
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  .total{
    margin-right: 10px;
    font-size: 1.1em;
  }
.rommand{
  .row{
    .active:hover{
      text-decoration: none;
      .card{
        transform: scale(0.95);
      }
    }
    .img{
      height: 150px;
      background-size: cover;
      background-position: center;
    }
    .card-body{
      display: flex;
      justify-content: space-between;
    }
    .card-text{
      color: #000;
    }
    
  }
}
@media (max-width: 414px){
  .rommand{
    .row{
      .col-md-3{
        margin-bottom:10px
      }
    }
  }
}
</style>

