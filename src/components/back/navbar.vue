<template>
        <div class="navbar">
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link" href="#" @click="signout()">登出</a>
                </li>
            </ul>
        </div>
</template>

<script>
export default {
        methods: {
            signout() {
                const vm = this
                const api = `${process.env.APIPATH}/logout`
                this.$http.post(api).then((response) => {
                    console.log(response.data)
                    if(response.data.success){
                       this.$router.push("/login")
                    }
                })
            }
        }
}
</script>
