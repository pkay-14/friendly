<template>
    <v-navigation-drawer 
        width=250
        permanent
        location="right"
    >
        <template v-slot:prepend>
            <v-avatar size="64">
                <v-img src="https://randomuser.me/api/portraits/women/81.jpg"></v-img>
            </v-avatar>
            <v-list-item
            lines="one"
            :title="currentUser.username"
            subtitle="Logged in"
            >
            </v-list-item>
            <span>
            <v-btn prepend-icon="mdi-logout">Logout</v-btn>
            </span>
        </template>
        <v-divider></v-divider>
        <v-list-item class="mt-10" prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        <div class="users">
            <v-list-item v-for="user in userAccounts" :key="user.id" 
            @click="convoSelect(user._id, user.username)"
            class="user-info mt-2"
            :prepend-avatar="user.profilePicture ? user.profilePicture : 'noProfile.jpg'"
            :title="user.username"
            :value="user.id">
            </v-list-item>
        </div>
    
    </v-navigation-drawer>
</template>
<script>
import * as utils from "../lib/helperMethods"
export default 
{
    props:["currentUser"],
    data() {
        return{
            conversations: [],
            userAccounts: []
        }
    },
    methods:{
        convoSelect(id, username){
            this.$emit('setCurrentConversation', id, username)
        },
        async getConversations(){
            try {
                const res = await utils.getRequest(`${process.env.VUE_APP_API_BASE_URL}/api/conversations/${this.currentUser._id}`);
                this.conversations = res.data
            } catch (err) {
                console.log(err);
            }
        },
            async getUsers(){
            try {
                const res = await utils.getRequest(`${process.env.VUE_APP_API_BASE_URL}/api/users/`);
                res.data.some((d) => {
                    d.username !== this.currentUser.username && this.userAccounts.push(d)
                    })
            } catch (err) {
                console.log(err);
            }
        }   
    },
    mounted(){
        this.getConversations()
        this.getUsers()

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