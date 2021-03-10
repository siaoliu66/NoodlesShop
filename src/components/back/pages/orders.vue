<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
            <thead>
                <tr>
                    <th>購買時間</th>
                    <th>Email</th>
                    <th>購買款項</th>
                    <th>訂單金額</th>
                    <th>是否附款</th>
                    <th>功能</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in lists" :key="item.id">
                    <td>{{ item.create_at }}</td>
                    <td>{{ item.user.email }}</td>
                    <td>
                        <ul class="list-unstyled">
                            <li v-for="productitem in item.products" :key="productitem.id">
                                {{productitem.product.title}} : {{productitem.qty}}{{productitem.product.unit}}
                            </li>
                        </ul>
                    </td>
                    <td>{{ item.total | currency}}</td>
                    <td v-if="item.is_paid" class="text-success">已付款</td>
                    <td v-else class="text-danger">尚未付款</td>
                    <td>
                        <button class="btn btn-outline-secondary btn-sm" @click="openModal(item)">查看</button>
                    </td>
                </tr>
            </tbody>
        </table>


    <!-- add Modal -->
        <div class="modal fade" id="ordersModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>查看訂單</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table">
                        <thead>
                            <th>品名</th>
                            <th>數量</th>
                            <th>單價</th>
                        </thead>
                        <tbody>
                            <tr v-for="item in tempProduct.products" :key="item.id">
                                <td class="align-middle">{{ item.product.title }}</td>
                                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                                <td class="align-middle text-right">{{ item.final_total | currency}}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" class="text-right">總計</td>
                                <td class="text-right">{{ tempProduct.total | currency}}</td>
                            </tr>
                        </tfoot>
                    </table>
                    </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">確認</button>
                </div>
                </div>
            </div>
            </div>

  </div>
</template>

<script>
// import $ from "jquery";

export default {
    data() {
        return {
            lists:[],
            tempProduct:{},
            isLoading:false,
        }
    },
    methods: {
        getOrders() {
          const vm = this
          const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/orders`
          vm.isLoading = true,
           this.$http.get(api).then((response) => {
                console.log(response)
                vm.isLoading = false
                vm.lists = response.data.orders
            })
        },
        openModal() {
          $('#ordersModal').modal('show')
        }
    },
    created() {
       this.getOrders()
    }
}
</script>