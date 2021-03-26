<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <alert></alert>
        <div class="header">
            <h1><a href="#" class="logo">牛老大</a></h1>
            <menubar/>
        </div>
        <div class="cart_container">
            <div class="row container" >
                <div class="cart">
                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body" >
                                <div class="card-title">
                                    結帳金額
                                </div>
                                <div class="card-text d-flex justify-content-between mb-2">
                                    <span>總計</span>
                                    <span>{{ cart.total | currency }}</span>
                                </div>
                                <div class="card-text d-flex justify-content-between mb-2 pb-2 border-bottom">
                                    <span>折扣</span>
                                    <span>{{ cart.final_total-cart.total | currency }}</span>
                                </div>
                                <div class="card-text d-flex justify-content-between align-items-center">
                                    <span>應付總額</span>
                                    <span class="text-danger font-weight-bolder h5">{{ cart.final_total | currency }}</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="cart-group">
                            <div class="title d-flex align-items-center">
                                <div class="circle">1</div>
                                <div class="text">購物車內容</div>
                            </div>
                            <table class="table ">
                                <thead class="thead-light">
                                    <th>品名</th>
                                    <th width="100">數量</th>
                                    <th width="100">單價</th>
                                    <th width="100"></th>
                                </thead>
                                <tbody>
                                    <tr v-for="item in cart.carts" :key="item.id">
                                        <td class="align-middle">
                                            {{ item.product.title }}
                                            <div class="text-success" v-if="item.coupon">
                                            已套用優惠券
                                            </div>
                                        </td>
                                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                                        <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                                        <td class="align-middle">
                                            <button type="button" class="btn btn-outline-danger btn-sm" @click.prevent.prevent="delcart(item.id)">
                                            <i class="far fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="cart-group">
                            <div class="title d-flex align-items-center">
                                <div class="circle">2</div>
                                <div class="text">訂購人資訊</div>
                            </div>
                            <ValidationProvider rules="required" v-slot="{ failed,errors }">
                                <div class="form-group">
                                    <label for="useremail" class="m-1">Email</label>
                                    <input type="email" class="form-control" name="email" id="useremail"
                                        v-model="form.user.email" placeholder="請輸入 Email" required>
                                    <span class="text-danger" v-if="failed">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>  
                            <ValidationProvider rules="required" v-slot="{ failed,errors }">
                                <div class="form-group">
                                    <label for="username" class="m-1">收件人姓名</label>
                                    <input type="text" class="form-control" name="name" id="username"
                                        v-model="form.user.name" placeholder="輸入姓名">
                                    <span class="text-danger" v-if="failed">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider> 
                            <ValidationProvider rules="cellphone" v-slot="{failed,errors}">
                                <div class="form-group">
                                    <label for="cellphone" class="m-1">收件人電話</label>
                                    <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                                    <span class="text-danger" v-if="failed">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>
                            <ValidationProvider rules="required" v-slot="{failed}">
                                <div class="form-group">
                                    <label for="useraddress" class="m-1">收件人地址</label>
                                    <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                                        placeholder="請輸入地址">
                                    <span class="text-danger" v-if="failed">地址欄位不得留空</span>
                                </div>
                            </ValidationProvider>
                                <div class="form-group">
                                <label for="comment" class="m-1">留言</label>
                                <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="conpon" class="m-1">優惠碼</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="conpon_code">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary" type="button" @click.prevent="addConponCode()">
                                            套用優惠碼
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <button class="btn btn-danger" @click="createOrder()">送出訂單</button>
                                </div>
                            </div>
                        </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .cart_container{
        margin-top: 64px;
        // background-color: #c4cbcf;
    }
    .del{
        text-decoration: line-through;
    }
    .container{
        margin: 0 auto;
    }
    .cart{
        display: flex;
        width: 100%;
        padding-top: 35px;
    }
    .title{
        margin: 10px;
    }
    .circle{
        display: block;
        float: left;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #4f4032;
        color:#fff;
        text-align: center;
        line-height: 20px;
    }
    .text{
        margin-left: 10px;
    }
    .form-group{
        margin-left: 10px;  
    }
    .cart-group{
        border-radius: 5px;
        border: 1px solid #dee2e6;
        margin: 8px;
        padding: 10px;
    }
    .fa-shopping-basket{
        position: absolute;
        top: 5%;
        transform: translateX(50%);
    }
</style>
<script>
import menubar from './topmenu'
import alert from '../alertMesseges'
// import $ from 'jquery'

export default {
    components: {
        menubar,alert
    },
    data() {
        return {
            cart:{},
            isLoading:false,
            temcartid:{},
            conpon_code:'',
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:''
                },
                message:''
            }
        }
    },
    methods:{
        getCarts() {
            const api = `${process.env.APIPATH}/api/${process.env.APIID}/cart`
            const vm = this
            vm.isLoading = true
            this.$http.get(api).then((response) => {
                console.log(response.data)
                this.cart = response.data.data
                vm.isLoading = false
                // vm.pagination = response.data.pagination
            })
        },
        delcart(id) {
            const api = `${process.env.APIPATH}/api/${process.env.APIID}/cart/${id}`
            const vm = this
            vm.isLoading = true
            this.$http.delete(api).then((response) => {
                console.log(response.data)
                this.getCarts()
                vm.isLoading = false
            })
        },
        addConponCode() {
            const api = `${process.env.APIPATH}/api/${process.env.APIID}/coupon`
            const vm = this
            const code = {
                code:vm.conpon_code
            }
            vm.isLoading = true
            this.$http.post(api,{data:code}).then((response) => {
                console.log(response.data);
                if(response.data.success){
                    vm.isLoading = false
                    vm.conpon_code=''
                    vm.getCarts()
                }else{
                    vm.isLoading = false
                    vm.conpon_code=''
                    this.$bus.$emit('message:push',response.data.message,'danger');
                }
            });
        },
        createOrder() {
            const api = `${process.env.APIPATH}/api/${process.env.APIID}/order`
            const vm = this
            vm.isLoading = true
            this.$http.post(api,{data:vm.form}).then((response) => {
                console.log('訂單已建立',response);
                if(response.data.success){
                    vm.isLoading = false;
                    vm.$router.push(`/checkout/${response.data.orderId}`)
                }else{
                    console.log(response.data.message);
                    vm.isLoading = false;
                }
                this.$emit('message:push',response.data.message,'warning')
            })
        }
    },
    created() {
        this.getCarts()
    }
}
</script>