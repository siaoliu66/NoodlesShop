<template>
    <div>
        <div class="header">
            <h1><a href="#" class="logo">牛老大</a></h1>
            <ul class="menubar">
                <li>
                    <router-link class="nav-link" to="/login">
                            關於牛老大
                    </router-link>
                </li>
                <li>                   
                    <router-link class="nav-link" to="/login">
                            最新消息
                    </router-link>
                </li>
                <li>                   
                    <router-link class="nav-link" to="/menu">
                            美味菜單
                    </router-link>
                </li>
                <li>
                    <router-link class="nav-link" to="/login">
                            商品管理
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="menu_container">
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col" v-for="item in products" :key="item.id">
                    <div class="card h-100">
                        <img :src="item.imageUrl" class="card-img-top img-fluid" width="350px" height="230px">
                        <div class="card-body">
                            <h5 class="card-title">{{item.title}}</h5>
                            <p class="card-text">{{item.price}}</p>
                        </div>
                    </div>
                </div>            
            </div>
        </div>
    </div>
</template>

<style lang="" scope>
    .menu_container{
        margin-top: 64px;
        height: 100vh;
        width: 100%;
        background-color: #c4cbcf;
    }
</style>
<script>
export default {
    data() {
        return {
            products:[],
        }
    },
    methods:{
        getProductAll() {
            const vm = this
            const api = `${process.env.APIPATH}/api/${process.env.APIID}/products/all`
            this.$http.get(api).then((response) => {
                console.log(response.data)
                vm.products = response.data.products
            })  
        }
    },
    created() {
        this.getProductAll()
    }
}
</script>