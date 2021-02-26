<template>
    <div class="signin">
        <form class="login" @submit.prevent="login()">
            <h1>會員登入</h1>
            <input type="email" id="inputEmail" class="form-control" placeholder="請輸入帳號" required v-model="user.username" >
            <input type="password" id="inputPassword" class="form-control" placeholder="請輸入帳號" required v-model="user.password">
            <button class="btn-sign" type="submit">登入</button>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            user: {
                username:'',
                password: '',
            }
        }
    },
    methods: {
        login() {
            const vm = this
            const api = `${process.env.APIPATH}/admin/signin`
            this.$http.post(api,vm.user).then((response) => {
                const token = response.data.token
                const expired = response.data.expired
                document.cookie = `token=${token};expires=${new Date(expired)};`;
                if(response.data.success){
                    this.$router.push("/admin/products")
                }else{
                    alert(response.data.message)
                    document.querySelector('#inputEmail').value='';
                    document.querySelector('#inputPassword').value=''
                }
            })
        }
    }
}
</script>