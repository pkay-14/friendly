<template>
<v-app>
  <div class="register" data-testid="register-page">
    <v-col cols="12" md="6" class="register-wrapper" >
      <v-sheet rounded>
        <v-label class="pt-4">
            <v-icon>mdi-account-plus-outline</v-icon>
            <h3>Register</h3>
        </v-label>
        <h1>FRIENDLY-CHAT</h1>
        <v-card class="register-card mx-auto px-6 py-4" max-width="344">
          <v-form
            model-value
            v-model="form"
            ref="form"
            @submit.prevent="register"
          >
            <v-text-field
              v-model="formData.email"
              :rules="[formRules.required, formRules.email]"
              class="mb-2"
              label="Email"
              data-testid=email
            ></v-text-field>

            <v-text-field
              v-model="formData.username"
              :rules="[formRules.required, formRules.minimum3]"
              class="mb-2"
              label="Username"
              data-testid=username
            ></v-text-field>

            <v-text-field
              v-model="formData.password"
              :rules="[formRules.required, formRules.minimum6]"
              label="Password"
              type="password"
              placeholder="Set your password"
              data-testid=password
            ></v-text-field>

            <v-text-field
              v-model="formData.passwordConfirm"
              :rules="[formRules.required, formRules.confirmPassword]"
              label="Confirm Password"
              type="password"
              placeholder="Enter your password again"
              data-testid=passwordConfirm
            ></v-text-field>
            <br>
            <v-btn
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
                <router-link :to="{name: 'login'}" data-testid="login-btn">
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

<script setup>
  import * as utils from "../lib/helperMethods"
  import {ref, reactive, onMounted} from "vue"
  import { useToast } from 'vue-toastification';
  import {useRouter} from "vue-router"

  const toast = useToast();
  const router = useRouter()

  onMounted(()=>{
    if(utils.isLoggedIn() ){
      router.push({name: 'home'})
    }
  })

  const form = ref(null)
  const formData = reactive({
    email: null,
    username: null,
    password: null,
    passwordConfirm: null,
    profilePicture: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`
  }) 
  const formRules = {
    required: value => !!value || 'Field is required',
    minimum3: value => (value && value.length >= 3) || 'Requires min of 3 characters',
    minimum6: value => (value && value.length >= 6) || 'Requires min of 6 characters',
    email: value => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) || 'Invalid email',
    confirmPassword: value => (value && value === formData.password) || 'Passwords do not match',
  }
  
  const register = () => {
    try {
      form.value.validate()
      .then((f)=>{
        if(f.valid){
          delete formData.passwordConfirm
          utils.postRequest(
            `${process.env.VUE_APP_API_BASE_URL}/api/auth/register`, formData
            )
          .then((res) =>{
            localStorage.setItem("userData", JSON.stringify(res.data))
            utils.isLoggedIn() ? router.push({name: 'home'}) : alert('Signup failed')
          })
          .catch((err)=>{
            let message = err.message
            console.log(err)
            if(err.response.status == 409){
              const duplicated = err.response.data
              message = duplicated == "email" ? 
              "user with this email already exists" : 
              "username has already been taken"
            }
            toast.error(message)
          })
          }
          else{
            toast.info("Please check your inputs")
          }
      })               
      } catch (error) {
      console.log(error)
      toast.error('error')
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