<template>
  <div>
    <!--<loading :active.sync="isLoading"></loading>
    // <button type="button" class="btn btn-primary float-right" @click="exportdata()">匯出</button>
    // <table class="table mt-4">
    //     <thead>
    //         <tr>
    //             <th>訂購產品</th>
    //             <th>訂購數量</th>
    //         </tr>
    //   </thead>
    //   <tbody>
    //         <tr v-for="product in filterProduct" :key="product.id">
    //             <th>{{ product }}</th>
    //             <th>訂購數量</th>
    //         </tr>
    //   </tbody>
    // </table>-->
      <alert></alert>
        <div class="container">
        <label for="price">商品金額</label>
        <input type="number" class="form price" id="price" placeholder="請輸入日幣金額" v-model.number="price">
        <label for="shipping">日本境內運費</label>
        <input type="number" class="form shipping" id="shipping" placeholder="請輸入日本境內運費,無運費請填0"  v-model.number="shipping">
        <label for="num">預估重量</label>
        <input type="number" class="form num" id="num" placeholder="請輸入預估重量(公斤)" v-model.number="num">
        <button @click="cal()">計算價格</button>
      </div>
      <hr>
      <div class="text" id="text" v-if="totalPrice">
      <p>📣報價如下</p>
      <p v-if="shipping==0">🔷商品金額：<span class="Price">{{price | toCurrency}}</span> * 0.270 = <span class="totalPrice">{{totalPrice | toCurrency}}</span></p>
      <p v-else>🔷商品金額：[<span class="Price">{{price | toCurrency}}</span> + <span class="Shipping">{{shipping | toCurrency}}</span>(日本境內運費)]* 0.270 = <span class="totalPrice">{{totalPrice | toCurrency}}</span></p>
      <p>🔷國際運費：1公斤250元<br>
      <p>🔷應付金額：<span class="totalPrice">{{totalPrice | toCurrency}}</span> + <span class="Num">250*{{num | toCurrency}}</span>(重量預估1kg以內) + 60(超商運費) = <span class="finalPrice">{{finalPrice | toCurrency}}</span></p>
      </div>
      <div class="copy">
      <button data-clipboard-target="#text" ref="copy" data-clipboard-action="copy" @click="copyLink">點擊複製</button>
      </div>
       
  </div>
</template>

<script>

import pagination from '@/components/pagination'
import alert from '@/components/alertMesseges'
import $ from "jquery";

export default{
  components: {
    alert
  },
  data() {
    return {
      price: '',
      shipping:'',
      num:'',
      totalPrice:'',
      finalPrice :'',
      copyBtn: null
    };
  },
  methods:{
    cal(){
      const vm = this
      vm.totalPrice = Math.round((vm.price + vm.shipping) * 270/1000)
      vm.finalPrice = Math.round(vm.totalPrice + vm.num * 250 + 60)
    },
    copyLink() {      
      const vm = this;
        const clipboard = vm.copyBtn;
        clipboard.on('success', function() {
          vm.$bus.$emit('message:push',"複製成功",'success')
        });
        clipboard.on('error', function() {
          vm.$bus.$emit('message:push',"複製失敗，請手動選擇複製！",'warning')
        });   
      }, 
    }, 
    filters:{
      toCurrency(num){
        var parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
      }
    },
    mounted() {    
      this.copyBtn = new this.clipboard(this.$refs.copy);
    },
}
// export default {
//     components:{
//         pagination
//     },
//   data() {
//     return {
//       lists: [],
//       total: [],
//       allOrder:[],
//       Productlist:[],
//       tempProduct: {},
//       isLoading: false,
//       pagination:{}
//     };
//   },
//   methods: {
//     getOrders(page = 1) {
//       const vm = this;
//       var arr=[];
//       const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/orders?page=${page}`;
//       (vm.isLoading = true),
//         this.$http.get(api).then((response) => {
//           console.log(response);
//           vm.isLoading = false;
//           vm.lists = response.data.orders;
//           vm.pagination = response.data.pagination
//           vm.lists.forEach((item) => {
//             const dates1 = new Date(item.create_at * 1000);
//             const year = dates1.getFullYear();
//             const month = dates1.getMonth() + 1;
//             const date = dates1.getDate();
//             item.create_at = `${year}/${month}/${date}`;
//             const dates2 = new Date(item.paid_date * 1000);
//             const year2 = dates2.getFullYear();
//             const month2 = dates2.getMonth() + 1;
//             const date2 = dates2.getDate();
//             item.paid_date = `${year2}/${month2}/${date2}`;
//           }); //讓Unix Timestamp轉回一般日期格式顯示
//         });
        
//     },
//     exportdata(){
//         const vm = this
//         vm.lists.forEach(function(item){
//             if(item.products){
//                 vm.total.push(item.products)
//             }
//         })
//         // console.log(vm.total)
//         vm.showexportdata()
//     },
//     showexportdata(){
//         const vm = this
//         vm.total.forEach(function(item){
//             Object.keys(item).forEach(function(tar){
//                 vm.allOrder.push(item[tar])
//             })
//         })
//     },
//   },
//   computed:{
//       filterProduct: function(){
//       const vm = this
//       vm.allOrder.forEach(function(item){
//         vm.Productlist.push(item.product.title)
//       })
//       //過濾重複的資料->透過filter過濾，回傳給定元素於陣列中第一個被找到之索引
//       vm.Productlist = vm.Productlist.filter(function(item,index,arr){
//         return arr.indexOf(item) === index;
//       })
//       return vm.Productlist
//     },
//   },
//   created() {
//     this.getOrders();
//     this.exportdata();
//   },
// };
</script>

<style lang="scss" scoped>
    .btn{
        margin-top: 1%;
    }
</style>