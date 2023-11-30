<template>
<v-app>
  <div class="register">
    <v-col cols="12" md="6" class="register-wrapper" >
      <v-sheet rounded>
        <v-label class="pt-4">
            <v-icon>mdi-account-plus-outline</v-icon>
            <h3>Register</h3>
        </v-label>
        <h1>FRIENDLY-CHAT</h1>
        <v-card class="register-card mx-auto px-6 py-4" max-width="344">
          <v-form
            v-model="form"
            ref="form"
            @submit.prevent="register"
          >
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              class="mb-2"
              label="Email"
            ></v-text-field>

            <v-text-field
              v-model="username"
              :rules="[rules.required, rules.minimum3]"
              class="mb-2"
              label="Username"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="[rules.required, rules.minimum6]"
              label="Password"
              type="password"
              placeholder="Set your password"
            ></v-text-field>

            <v-text-field
              v-model="passwordConfirm"
              :rules="[rules.required, rules.confirmPassword]"
              label="Confirm Password"
              type="password"
              placeholder="Enter your password again"
            ></v-text-field>
            <br>
            <v-btn
                :disabled="!valid"
              :loading="loading"
              block
              color="success"
              size="large"
              type="submit"
              variant="outlined"
              
            >
              Register
            </v-btn>
            <p class="py-2">
              Already have an account?
              <span>
                <router-link :to="{name: 'login'}">
                  Login
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
      valid: true,
      email: null,
      username: null,
      password: null,
      passwordConfirm: null,
      userData: {},
        rules: {
          required: value => !!value || 'Field is required',
          minimum3: value => (value && value.length >= 3) || 'Requires min of 3 characters',
          minimum6: value => (value && value.length >= 6) || 'Requires min of 6 characters',
          email: value => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) || 'Invalid email',
          confirmPassword: value => (value && value === this.password) || 'Passwords do not match',
        }
      
  }
  },
  computed: {
     passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Password must match";
    }
  },
  methods: {
    formValidated() {
      if (this.$refs.form.validate()) {
        return this.$refs.form.errors.length >= 1 ? false : true
      }
    },
     async register() {
      try {
            if(this.formValidated()){
              const res = await utils.postRequest(`${process.env.VUE_APP_API_BASE_URL}/api/auth/register`, 
              {"email": this.email, "username": this.username,  "password": this.password})
              localStorage.setItem("userData", JSON.stringify(res.data))
              utils.isLoggedIn() ? this.$router.push({name: 'home'}) : alert('Signup failed')
            }
                   
        } catch (error) {
        console.log(error)
        alert('Signup failed')
      }
    }
  }
}
</script>
<style scoped>
  .register{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;    
  }
  .register-wrapper{
    /* background-color: grey; */
    width: 50vw;
    color: black;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .register-card{
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