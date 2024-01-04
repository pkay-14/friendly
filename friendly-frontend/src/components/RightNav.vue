<template>
    <v-navigation-drawer 
        width=250
        permanent
        location="right"
    >
        <template v-slot:prepend>
            <v-avatar size="64">
                <v-img 
                :src="currentUser.profilePicture 
                ? currentUser.profilePicture 
                : 'noImage.png'">
                </v-img>
            </v-avatar>
            <v-list-item
            lines="one"
            :title="currentUser.username"
            subtitle="Logged in"
            >
            </v-list-item>
            <span>
            <v-btn @click="logout" prepend-icon="mdi-logout">Logout</v-btn>
            </span>
        </template>
        <v-divider></v-divider>
        <v-list-item class="mt-10" prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        <div class="users">
            <v-list-item v-for="user in userAccounts" :key="user.id" 
            @click="selectConvo(user._id, user.username, user.profilePicture)"
            class="user-info mt-2"
            :prepend-avatar="user.profilePicture ? user.profilePicture : 'noProfile.jpg'"
            :title="user.username"
            :value="user.id">
            </v-list-item>
        </div>
    
    </v-navigation-drawer>
</template>
<script setup>
import * as utils from "../lib/helperMethods"
import {reactive, defineProps, onMounted} from "vue"
import { useRouter } from "vue-router"
  
   onMounted(() =>{
        getUsers()   
   })

   const router = useRouter()
    
    const props = defineProps(["currentUser"])
    const emits = defineEmits(["selectConvo"])

    const conversations =  reactive([])
    const userAccounts = reactive([])

    const logout = () =>{
        localStorage.removeItem("userData")
        router.push({name: 'login'})
    }  
    
    const selectConvo = (id, username, profilePicture) =>{
        emits('setCurrentConversation', id, username, profilePicture)
    }

    const getConversations = () => {
        try {
            utils.getRequest(`${process.env.VUE_APP_API_BASE_URL}/api/conversations/${currentUser._id}`)
            .then((data)=>{
                this.conversations = res.data
            })
        } catch (err) {
            console.log(err);
        }
    }
    
    const getUsers = () => {
        try {
            utils.getRequest(`${process.env.VUE_APP_API_BASE_URL}/api/users/`)
            .then((res)=>{
                res.data.some((d) => {
                d.username !== props.currentUser.username && userAccounts.push(d)
                })
            })
            
        } catch (err) {
            console.log(err);
        }
    }   
</script>

<style>
.users{
    width: 100%;
}
.user-info{
    width: 100%;
    cursor: pointer;
    
}
.user-info:hover{
    background-color: rgb(112, 107, 107);
    transition: 0.6s;
}
</style>