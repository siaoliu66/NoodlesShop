<template>
  <div>
    <h1><a href="/index" class="logo">
    <img :src="`./static/img/logo.jpg`"></a></h1>
    <ul class="menubar">
      <li>
        <router-link class="nav-link" to="/index"> 關於牛老大 </router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/index"> 最新消息 </router-link>
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
  </div>
</template>