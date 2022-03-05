<template>
  <div>
    <div class="header">
      <menubar />
    </div>
    <div class="container cart_container">
      <h2 class="h2">訂單已成立</h2>
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
            <div class="circle"></div>
            <span class="text-center">確認結帳</span>
          </div>
          <div class="line"></div>
          <div class="steplist">
            <div class="circle show"></div>
            <span class="text-center">訂購成功</span>
          </div>
        </div>
      </div>
      <div class="row justify-content-center cartContent mb-3">
        <div class="col-md-8 checkout">
          <div class="title">訂單產品明細<a href="#" class="slide" @click="toggleClick()">
            <i class="fas fa-angle-up" v-if="this.isOpen"></i>
            <i class="fas fa-angle-down" v-else></i>
          </a></div>
          <div class="orderProduct"  style="display: none">
            <table class="table">
              <thead class="thead-light">
                <th>商品圖片</th>
                <th>商品名稱</th>
                <th>購買數量</th>
                <th>售價</th>
                <th>總價</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id" class="text-center">
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
                  <td class="align-middle">
                    {{ item.final_total | currency }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                <th colspan="4" class="text-right">總計 : </th>
                <th scope="col">{{ order.total | currency }}</th>
              </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="col-md-8 checkorder">
          <div class="title">訂單資訊</div>
          <table class="table">
          <tbody>
            <tr>
              <th>訂單編號</th>
              <td >{{ order.id }}</td>
            </tr>
            <tr>
              <th>顧客姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>顧客電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>顧客地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table> 
        <div class="row justify-content-center">
          <button class="btn btn-outline-info" @click="payOrder" v-if="order.is_paid === false">確認付款去</button>
          <router-link class="btn btn-primary" to="/index">回首頁</router-link>
        </div>
        </div>
      </div>
    </div>
     <Footer />
  </div>
</template>
<style scoped src="@/assets/customcss/card.css"></style>
<style lang="scss" scoped>
.container {
  margin-top: 64px;
  .order {
    margin: 0 auto;
    padding-top: 15px;
    h5{
        font-size: 20px;
        margin: 10px;
    }
  }
}
</style>
<script>
import menubar from "./topmenu";
import Footer from "./footer";
import $ from "jquery"
export default {
  components: { menubar,Footer },
  data() {
    return {
      OrderId: "",
      order: {
        user: {},
      },
      isOpen:false,
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/order/${vm.OrderId}`;
      this.$http.get(url).then((response) => {
        console.log(response.data);
        vm.order = response.data.order;
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/pay/${vm.OrderId}`;
      this.$http.post(url).then((response) => {
        console.log(response.data);
        vm.getOrder();
      });
    },
    toggleClick(){
      $('.orderProduct').slideToggle();
      this.isOpen = !this.isOpen;
    }
  },
  created() {
    this.OrderId = this.$route.params.order_id;
    this.getOrder();
  },
};
</script>