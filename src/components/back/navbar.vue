<template>
    <div>
        <header class="navbar">
            <a class="navbar-brand brand" href="#">Company name</a>
            <a class="navbar-brand" href="#" @click.prevent="signout()">Sign out</a>
        </header>
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