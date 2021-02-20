<template>
    <div>
        <navbar></navbar>
        <div class="row">
            <sidebar/>
            <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script>
import navbar from './navbar'
import sidebar from './sidebar'

export default {
components:{
    navbar,sidebar
},
created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
    // this.getproducts();
  },
}
</script>