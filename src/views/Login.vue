<template>
<div>
    <img align="center" class="basalt-block-blue1" src="@/assets/logos_en_blocks/basalt-block-blue.png" />
    <img align="center" class="basalt-block-blue2" src="@/assets/logos_en_blocks/basalt-block-blue.png" />
    <img align="center" class="basalt-block-orange1" src="@/assets/logos_en_blocks/basalt-block-orange.png" />
    <div class="centered">
        <v-img class="logo"
        src="@/assets/logos_en_blocks/logo-basalt.png"
        width="234px"></v-img>
        
        <v-text-field
              label="E-mail"
              placeholder="e-mail"
              v-model="login.email"
        ></v-text-field>
        <v-text-field
              label="Password"
              placeholder="password"
              type="password"
              v-model="login.password"
        ></v-text-field>
        <v-btn block color="accent" @click="login" class="login">
            Inloggen
        </v-btn>
        <p class="registry__button">
            Nog geen account? klik <a to="/dashboard">hier</a> om je te registreren
        </p>
    </div>
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
    margin: 100px auto 60px auto;
} 

.centered {
    position: relative;
    top: 20%;
}

.login {
    margin: 30px 0 0 0;
}

.basalt-block-blue1{
  position: fixed;
  top: 320px;
  right: -212px;
}
.basalt-block-blue2{
  position: fixed;
  bottom: -100px;
  left: -100px;
  height: 30%;
}
.basalt-block-orange1{
  position: fixed;
  top: -70px;
  left: -50px;
}

</style>