<template>
    <div>
        <alert></alert>
        <div class="row dashoard">
            <sidebar :tab="category" />
            <main>
                <navbar/>
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script>
import navbar from './navbar'
import sidebar from './sidebar'
import alert from '../alertMesseges'


export default {
components:{
    sidebar,alert,navbar
},
data() 
{
    return {
      category:this.$route.name
    };
  },
created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
    console.log(this.$route.name)
  },
  watch: {
'$route':'getPath'
},
methods: {
getPath(){
this.category = this.$route.name
}
}
}
</script>