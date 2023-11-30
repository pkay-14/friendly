<template>
<v-app>
  <div class="login">
    <v-col cols="12" md="6" class="login-wrapper" >
      <v-sheet rounded>
        <v-label class="pt-5">
          <v-icon>mdi-login</v-icon>
          <h3>Login</h3>
        </v-label>
        <h1>FRIENDLY-CHAT</h1>
        <v-card class="login-card mx-auto px-6 py-4" max-width="344">

          <v-form
            v-model="form"
            @submit.prevent="login"
          >
            <v-text-field
              v-model="email"
              :rules="[rules.required]"
              class="mb-2"
              label="Email"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="[rules.required]"
              label="Password"
              type="password"
              placeholder="Enter your password"
            ></v-text-field>
            <br>

            <v-btn
              :disabled="!form"
              :loading="loading"
              block
              color="success"
              size="large"
              type="submit"
              variant="outlined"
            >
              Sign In
            </v-btn>
            <p class="py-2">
              Don't have an account?
              <span>
                <router-link :to="{name: 'register'}">
                  Sign Up
                </router-link>
              </span>
            </p>
          </v-form>
        </v-card>
      </v-sheet>
    </v-col>
  </div>
</v-app>  
</template>

<script>
import * as utils from "../lib/helperMethods"
export default {
  mounted(){
    if(utils.isLoggedIn() ){
      this.$router.push({name: 'home'})
    }
  },
  data(){
    return{
      email: '',
      password: '',
      userData: {},
        rules: {
          required: value => !!value || 'Field is required'
        }
      // value => (value && value.length >= 3) || 'Min 3 characters',
  }
  },
  methods: {
     async login() {
      try {
         const res = await utils.postRequest(`${process.env.VUE_APP_API_BASE_URL}/api/auth/login`, 
          {"email": this.email, "password": this.password})
       localStorage.setItem("userData", JSON.stringify(res.data))
       utils.isLoggedIn() ? this.$router.push({name: 'home'}) : alert('Unsuccessful Login')
      } catch (error) {
        console.log(error)
        alert('Unsuccessful Login')
      }
    }
  }
}
</script>
<style scoped>
  .login{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;    
  }
  .login-wrapper{
    /* background-color: grey; */
    width: 50vw;
    color: black;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .login-card{
    width: 100%;
  }
  h1{
    font-family: 'Times New Roman', Times, serif;
    color: rgb(221, 0, 255);
  }
  .brand{
    display: flex;
  }
  .brand-img{
    border-radius: 50%;
    height: 5rem;
    width: 2rem

  }
</style>