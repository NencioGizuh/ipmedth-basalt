<template>
    <div>
        <v-btn block color="accent" @click="login">
            Inloggen
        </v-btn>

        Login
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            
        }
    },
    methods: {
        login() {
            // TODO: Change function
            this.$store.dispatch("setToken", "token123");
            this.$router.push('/dashboard');
        }
    }
}
</script>

<style lang="scss">

</style>