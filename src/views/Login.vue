<template>
    <div class="centered">
        <v-img class="logo"
        src="@/assets/logos_en_blocks/logo-basalt.png"
        width="234px"></v-img>
        
        <v-text-field
              label="E-mail"
              placeholder="e-mail"
        ></v-text-field>
        <v-text-field
              label="Password"
              placeholder="password"
              type="password"
        ></v-text-field>
        <v-btn block color="accent" @click="login" class="login">
            Inloggen
        </v-btn>
        <p class="registry__button">
            Nog geen account? klik <a to="/dashboard">hier</a> om je te registreren
        </p>
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

<style lang="scss" scoped>

.registry__button {
    font-size: 0.7em;
    text-align: center;
    margin: 10px 0 0 0;
}

.logo {
    margin: 0 auto 60px auto;
} 

.centered {
    position: relative;
    top: 20%;
}

.login {
    margin: 30px 0 0 0;
}

    

</style>