<template>
    <nav
      class="sidebarmenu"
      :class="{ active: showTopMenu }"
    >
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item" :class="{tab:category =='Products'}">
            <router-link class="nav-link" to="/admin/products" >
              <span data-feather="home"></span>
              <i class="fas fa-box-open"></i>
              產品列表
            </router-link>
          </li>
          <li class="nav-item"  :class="{tab:category =='Orders'}">
            <router-link class="nav-link" to="/admin/orders" >
              <span data-feather="file"></span>
              <i class="fas fa-list-alt"></i>
              訂單列表
            </router-link>
          </li>
          <li class="nav-item"  :class="{tab:category =='Coupon'}">
            <router-link class="nav-link" to="/admin/coupon" >
              <span data-feather="shopping-cart"></span>
              <i class="fas fa-ticket-alt"></i>
              優惠卷
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>


<script>
// import $ from "jquery";
export default {
  data() {
    return {
      showTopMenu: false,
      category:this.tab
    };
  },
  props:['tab'],
  methods: {
    togglebar() {
      var vm = this;
      this.showTopMenu = !this.showTopMenu;
      setTimeout(function() {
        vm.showTopMenu = false;
      }, 1500);
    }
  },
  watch:{
    tab(){
      console.log(this.tab,this.category)
      this.category = this.tab
    }
  }
  // computed:{
  //   tab:function(){
  //     // console.log(tab)
  //   }
  // },
  
};
</script>
