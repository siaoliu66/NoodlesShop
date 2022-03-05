<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h1><router-link class="logo" to="/index"><img :src="`./static/img/logo.png`"></router-link>
    </h1>
    <ul class="menubar" :class="{'active': showTopMenu}">
      <li>
        <router-link class="nav-link" to="/aboutUs"> 關於牛老大 </router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/menu"> 美味菜單 </router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/cart">購物車
        <span class="cartsnum" v-show="cartnum>0" >{{cartnum}}</span>
          <i class="fas fa-shopping-cart hideicon"></i>
        </router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/favorite">
        <span class="favnum" v-show="favnum>0" >{{favnum}}</span>
          <i class="fas fa-heart hideicon"></i><p class="showText">收藏清單</p>
        </router-link>
      </li>
    </ul>
    <a href="#" class="showmenu" @click="togglebar">
      <i class="fas fa-bars"></i>
      </a>
  </div>
</template>

<style lang="scss" scoped>
  .active {
    display: block
  }
</style>


<script>
// import $ from "jquery";
export default {
  props:['cartnum','favnum'],
  data() {
    return {
      showTopMenu: false,
      isLoading: false,
    };
  },
  methods:{
    togglebar(){
      this.showTopMenu = !this.showTopMenu
    },
  }
}
</script>