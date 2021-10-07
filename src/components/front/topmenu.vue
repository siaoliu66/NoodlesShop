<template>
  <div>
    <h1><router-link class="logo" to="/index"><img :src="`./static/img/logo.jpg`"></router-link>
    </h1>
    <ul class="menubar" :class="{'active': showTopMenu}">
      <li>
        <router-link class="nav-link" to="/aboutUs"> 關於牛老大 </router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/news"> 最新消息 </router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/menu"> 美味菜單 </router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/login" target="_blank">
          商品管理
        </router-link>
      </li>
    </ul>
    <a href="#" class="showmenu" @click="togglebar"><i class="fas fa-bars"></i></a>
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
  data() {
    return {
      showTopMenu: false,
    };
  },
  methods:{
    togglebar(){
      this.showTopMenu = !this.showTopMenu
    }
  }
}
</script>