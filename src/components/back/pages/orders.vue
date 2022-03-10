<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="m-4 row justify-content-between">
      <div class="input-group">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01"
            >搜尋條件</label
          >
        </div>
        <select
          class="custom-select"
          id="inputGroupSelect01"
          v-model="searchType"
        >
          <option selected>Choose...</option>
          <option value="createId" @click="searchType = 'createId'"
            >訂單編號</option
          >
          <option value="date" @click="searchType = 'date'">購買時間</option>
          <option value="name" @click="searchType = 'name'">訂購人</option>
        </select>
        <input
          type="text"
          id="searchBox"
          class="searchBox ml-2 border col-6"
          v-model="searchVal"
          v-if="searchType"
        />
      </div>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>功能</th>
          <th>訂單編號</th>
          <th>購買時間</th>
          <th>顧客</th>
          <th>訂單金額</th>
          <th>是否附款</th>
          <th>訂單狀況</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filterlist" :key="item.id">
          <td>
            <button
              class="btn btn-outline-secondary btn-sm"
              @click="openModal(item)"
            >
              查看
            </button>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="editerModal(item)"
            >
              編輯
            </button>
          </td>
          <td>{{ item.id }}</td>
          <td>{{ item.create_at }}</td>
          <td>{{ item.user.name }}</td>
          <td>{{ item.total | currency }}</td>
          <td v-if="item.is_paid" class="text-success">已付款</td>
          <td v-else class="text-danger">尚未付款</td>
          <th>{{ item.user.status }}</th>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @emit-page="getOrders" />
    <!-- 查看 -->
    <div
      class="modal fade"
      id="ordersModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>查看訂單</span>
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
            <div class="border rounded m-2">
              <div class="order_title">訂購資訊</div>
              <table class="table order">
                <tbody v-if="tempProduct.user">
                  <tr>
                    <th scope="row">訂購人</th>
                    <td>{{ tempProduct.user.name }}</td>
                  </tr>
                  <tr>
                    <th scope="row">收件地址</th>
                    <td>{{ tempProduct.user.address }}</td>
                  </tr>
                  <tr>
                    <th scope="row">聯絡電話</th>
                    <td>{{ tempProduct.user.tel }}</td>
                  </tr>
                  <tr>
                    <th scope="row">電子郵件</th>
                    <td>{{ tempProduct.user.email }}</td>
                  </tr>
                  <tr>
                    <th scope="row">備註</th>
                    <td>{{ tempProduct.message }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="border rounded m-2">
              <div class="order_title">付款資訊</div>
              <table class="table order">
                <tbody>
                  <tr>
                    <th scope="row">訂購日期</th>
                    <td>{{ tempProduct.create_at }}</td>
                  </tr>
                  <tr>
                    <th scope="row">總金額</th>
                    <td>{{ tempProduct.total | currency }}</td>
                  </tr>
                  <tr>
                    <th scope="row">付款狀態</th>
                    <td>
                      <span v-if="tempProduct.is_paid" class="text-success"
                        >付款成功</span
                      >
                      <span v-else>未付款</span>
                    </td>
                  </tr>
                  <tr v-if="tempProduct.is_paid">
                    <th scope="row">付款日期</th>
                    <td>{{ tempProduct.paid_date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="border rounded m-2">
              <div class="product_title">訂單內容</div>
              <table class="table mb-2">
                <thead>
                  <th>品名</th>
                  <th>數量</th>
                  <th>價格</th>
                </thead>
                <tbody>
                  <tr v-for="item in tempProduct.products" :key="item.id">
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">
                      {{ item.qty }}/{{ item.product.unit }}
                    </td>
                    <td class="align-middle text-right">
                      {{ item.final_total | currency }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr v-if="filtercoupon - tempProduct.total !=0">
                    <td colspan="2" class="text-right">小計</td>
                    <td class="text-right" >{{ filtercoupon | currency}}</td>
                  </tr>
                  <tr v-if="filtercoupon - tempProduct.total !=0">
                    <td colspan="2" class="text-right">優惠券折扣</td>
                    <td class="text-right text-success" >- {{ filtercoupon - tempProduct.total | currency}}</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="text-right">總計</td>
                    <td class="text-right">
                      {{ tempProduct.total | currency }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 編輯 -->
    <div
      class="modal fade"
      id="editerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>修改訂單</span>
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
            <div class="border rounded m-2">
              <div class="order_title">訂購資訊</div>
              <table class="table order">
                <tbody v-if="tempProduct.user">
                  <tr>
                    <th scope="row">訂購人</th>
                    <td>
                      <input type="text" v-model="tempProduct.user.name" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">收件地址</th>
                    <td>
                      <input type="text" v-model="tempProduct.user.address" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">聯絡電話</th>
                    <td>
                      <input type="text" v-model="tempProduct.user.tel" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">電子郵件</th>
                    <td>
                      <input type="text" v-model="tempProduct.user.email" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">備註</th>
                    <td><input type="text" v-model="tempProduct.message" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="border rounded m-2">
              <div class="order_title">付款資訊</div>
              <table class="table order">
                <tbody>
                  <tr>
                    <th scope="row">訂購日期</th>
                    <td>
                      {{tempProduct.create_at}}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">總金額</th>
                    <td>{{ tempProduct.total | currency }}</td>
                  </tr>
                  <tr>
                    <th scope="row">付款狀態</th>
                    <td>
                      <span v-if="tempProduct.is_paid" class="text-success"
                        >付款成功</span
                      >
                      <span v-else class="text-danger"
                        >未付款
                        <button class="btn btn-warning" @click="payOrder()">
                          進行付款
                        </button></span
                      >
                    </td>
                  </tr>
                  <tr v-if="tempProduct.is_paid">
                    <th scope="row">付款日期</th>
                    <td>{{ tempProduct.paid_date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="border rounded m-2">
              <div class="product_title">訂單內容</div>
              <table class="table">
                <thead>
                  <th>品名</th>
                  <th>數量</th>
                  <th>價格</th>
                </thead>
                <tbody>
                  <tr v-for="item in tempProduct.products" :key="item.id">
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">
                      {{ item.qty }}/{{ item.product.unit }}
                    </td>
                    <td class="align-middle text-right">
                      {{ item.final_total | currency }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr v-if="filtercoupon - tempProduct.total !=0">
                    <td colspan="2" class="text-right">小計</td>
                    <td class="text-right" >{{ filtercoupon | currency}}</td>
                  </tr>
                  <tr v-if="filtercoupon - tempProduct.total !=0">
                    <td colspan="2" class="text-right">優惠券折扣</td>
                    <td class="text-right text-success" >- {{ filtercoupon - tempProduct.total | currency}}</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="text-right">總計</td>
                    <td class="text-right">
                      {{ tempProduct.total | currency }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateOrders()"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.order_title,
.product_title {
  color: #9a9ea2;
  padding: 10px;
}
.order {
  th {
    width: 150px;
  }
}
.info {
  display: flex;
  padding: 8px;
  margin-bottom: 12px;
  justify-content: space-between;
  .order_date,
  .order_price,
  .order_financial_status,
  .order_paiddate {
    font-size: 1.2em;
    color: #9a9ea2;
    span {
      color: black;
    }
  }
}
#editerModal {
  .table {
    td {
      padding: 0.5rem;
      input,
      .form-control {
        width: 75%;
        font-family: inherit;
        border: 1px solid #e3e3e3;
        border-radius: 4px;
        color: #565656;
        height: 30px;
        margin: 0 auto;
        font-size: 0.8rem;
        padding: 0;
        padding: 5px;
      }
    }
  }
}
</style>
<script>
import $ from "jquery";
import pagination from "@/components/pagination";

export default {
  components: {
    pagination
  },
  data() {
    return {
      lists: [],
      tempProduct: {},
      isLoading: false,
      pagination: {},
      searchType: "",
      searchVal: "",
    };
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/orders?page=${page}`;
      (vm.isLoading = true),
        this.$http.get(api).then(response => {
          console.log(response);
          vm.isLoading = false;
          vm.lists = response.data.orders;
          vm.pagination = response.data.pagination;
          vm.lists.forEach(item => {
            const dates1 = new Date(item.create_at * 1000);
            const year = dates1.getFullYear();
            const month = dates1.getMonth() + 1;
            const date = dates1.getDate();
            item.create_at = `${year}/${month}/${date}`;
            const dates2 = new Date(item.paid_date * 1000);
            const year2 = dates2.getFullYear();
            const month2 = dates2.getMonth() + 1;
            const date2 = dates2.getDate();
            item.paid_date = `${year2}/${month2}/${date2}`;
          }); //讓Unix Timestamp轉回一般日期格式顯示
          console.log( vm.lists[0] )
        });
    },
    updateOrders() {
      const vm = this;
      vm.isLoading = true;
      vm.tempProduct.create_at = Math.floor(
        new Date(vm.tempProduct.create_at) / 1000
      );
      vm.tempProduct.paid_date = Math.floor(
        new Date(vm.tempProduct.paid_date) / 1000
      );
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/admin/order/${vm.tempProduct.id}`;
      this.$http.put(url, { data: vm.tempProduct }).then(response => {
        console.log(response.data);
        this.getOrders();
        vm.isLoading = false;
        $("#editerModal").modal("hide");
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/pay/${vm.tempProduct.id}`;
      this.$http.post(url).then(response => {
        console.log(response.data);
        this.getOrders();
      });
    },
    openModal(item) {
      this.tempProduct = Object.assign({}, item);
      $("#ordersModal").modal("show");
    },
    editerModal(item) {
      this.tempProduct = Object.assign({}, item);
      $("#editerModal").modal("show");
    }
  },
  created() {
    this.getOrders();
  },
  computed: {
    filterlist: function() {
      const vm = this;
      if (vm.searchVal == "") {
        return vm.lists;
      } else {
        var filterlist = [];
        if (vm.searchType == "createId") {
          vm.lists.forEach(function(item) {
            if (item.id.indexOf(vm.searchVal) != -1) {
              filterlist.push(item);
            }
          });
          return filterlist;
        } else if (vm.searchType == "date") {
          vm.lists.forEach(function(item) {
            if (item.create_at.indexOf(vm.searchVal) != -1) {
              filterlist.push(item);
            }
          });
          return filterlist;
        } else if (vm.searchType == "name") {
          vm.lists.forEach(function(item) {
            if (item.user.name.indexOf(vm.searchVal) != -1) {
              filterlist.push(item);
            }
          });
          return filterlist;
        }
      }
    },
    filtercoupon:function(){
      var filtercoupon = 0;
      var obj = this.tempProduct.products
      if(obj){
        var arr = Object.values(obj)
        arr.forEach(item=>{
        filtercoupon += item.total
      })
      return filtercoupon 
      }
      return filtercoupon 
    }
  }
};
</script>
