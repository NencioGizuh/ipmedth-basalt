<template>
<div>
    <img align="center" class="basalt-block-blue1" src="@/assets/logos_en_blocks/basalt-block-blue.png" />
    <img align="center" class="basalt-block-blue2" src="@/assets/logos_en_blocks/basalt-block-blue.png" />
    <img align="center" class="basalt-block-orange1" src="@/assets/logos_en_blocks/basalt-block-orange.png" />
    <div class="centered">
        <v-img class="logo"
        src="@/assets/logos_en_blocks/logo-basalt.png"
        width="234px"></v-img>
        <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
              label="E-mail"
              placeholder="E-mail"
              required 
              :rules="rules.emailRules"
              v-model="login.email"
        ></v-text-field>
        <v-text-field
              label="Wachtwoord"
              placeholder="Wachtwoord"
              type="password"
              required 
              :rules="rules.wachtwoordRules"
              v-model="login.password"
        ></v-text-field>
        <v-btn :disabled="login_success || !valid" @click="validate" block color="accent" class="login">
            Inloggen
        </v-btn>
        <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="headline mb-2 red lighten-2">
                {{ loginErrors.loginErrorTitle }}
              </v-card-title>
              <v-card-text>
                {{ loginErrors.loginErrorBody }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  {{ loginErrors.loginErrorButton }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-form>
        <p class="registry__button">
            Nog geen account? klik <a @click="register">hier</a> om je te registreren
        </p>
    </div>
</div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            loginErrors: {
            },
            dialog: false,
            login_success: false,
            valid: true,
            login: {
                email: null,
                password: null
            },
            rules: {
                emailRules: [
                    v => !!v || 'E-mail is vereist',
                    v => /.+@.+\..+/.test(v) || 'E-mail moet valide zijn',
                ],
                wachtwoordRules: [
                    v => !!v || 'Wachtwoord is vereist',
                    v => v.length >= 6 || 'Minimaal 6 karakters'
                ],
            }
        }
    },
    methods: {
        register() {
            this.$router.push('/register');
        },
        loginUser() {
            var vm = this;
            this.$store.commit("saveInloggen", this.login);
            this.$store.dispatch("postLogin")
            .then(function () {
                vm.dialog = false;
                vm.login_success = true;
                vm.$router.push("/dashboard");
            })
            .catch(function () {
            vm.loginErrors = vm.$store.state.registraties.inloggenErrors;
            switch (vm.loginErrors.loginErrorStatus) {
                case 400:
                 vm.dialog = true;
                 break;
          }
            });
            /*setTimeout( // Als de backend klaar is een succesvol action recall laten
            function(){ 
                vm.$router.push('/dashboard');
            }, 3000); */
        },
        validate(){
        this.$refs.form.validate();
        if (this.$refs.form.validate()){
            this.loginUser();
        }
        },
        /*login() {
            // TODO: Change function
            this.$store.dispatch("setToken", "token123");
            this.$router.push('/dashboard');
        } */
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