<template>
  <v-card>
    <v-layout class="layout">
      <RightNav :currentUser="currentUser" @setCurrentConversation="setCurrentConversation"/>
      <v-main class="main" style="height: 100vh">
        <div v-if="currentConversation.chattingWith.username.length != 0">
          <div class="chat-header px-10 py-4">
            <v-avatar size="x-large" color="surface-variant">
              <v-img
                :src="currentConversation.chattingWith.profilePicture ? currentConversation.chattingWith.profilePicture : 
                `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 20)}.jpg`"
              ></v-img>
            </v-avatar>
            <h1 class="pl-5 pt-1">{{currentConversation.chattingWith.username}}</h1>
          </div>
          <v-list class="messages-container px-2 py-1">
            <div
              v-for="message in messageList"
              :key="message.id"
              :class="
                message.senderId == currentUser._id
                  ? chatUpperDiv.sent
                  : chatUpperDiv.received
              "
            >
              <div
                :class="
                  message.senderId == currentUser._id
                    ? chatInnerDiv.sent
                    : chatInnerDiv.received
                "
              >
                <v-list-item
                  :class="
                    message.senderId == currentUser._id
                      ? chatItemStyle.sent
                      : chatItemStyle.received
                  "
                >
                  <p class="text-left py-2">
                    {{ message.message }}
                  </p>
                </v-list-item>
              </div>
            </div>
         
          </v-list>
          <div class="chat-footer">
            <v-form @submit.prevent="sendText" class="input-form">
              <v-text-field
                theme="light"
                class="text-area"
                variant="solo"
                append-inner-icon="mdi-send"
                v-model="textValue"
              ></v-text-field>
            </v-form>
          </div>
        </div>
        <div class="center-screen">
          <h1>Select a user to chat with</h1>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script>
import RightNav from "../components/RightNav.vue";
import LeftNav from "../components/LeftNav.vue";
import { isLoggedIn } from "../lib/helperMethods";
import { socket, state } from "@/socket";

export default {
  name: "HomeView",
  components: {
    LeftNav,
    RightNav,
  },
  data() {
    return {
      textValue: "",
      currentConversation: {
        members: [],
        id: '',
        chattingWith:{
          username: '',
          profilePicture: ''
        }
      },

      messageList: [
        // {
        //   id: 1,
        //   message: "hello",
        //   senderId: "6564cc3cf36a18d77a3626e2",
        //   date: "",
        // },
        // {
        //   id: 2,
        //   message: "hiii",
        //   senderId: "",
        //   date: "",
        // },
        // {
        //   id: 3,
        //   message: "how are you?",
        //   senderId: "6564cc3cf36a18d77a3626e2",
        //   date: "",
        // },
        // {
        //   id: 4,
        //   message: "i'm good",
        //   senderId: "6564cc3cf36a18d77a3622",
        //   date: "",
        // },
      ],
      currentUser: JSON.parse(localStorage.getItem("userData")),
      chatUpperDiv: {
        sent: "message-wrapper d-flex flex-row-reverse",
        received: "message-wrapper d-flex",
      },
      chatInnerDiv: {
        sent: "message-content-wrapper d-flex flex-row-reverse",
        received: "message-content-wrapper",
      },
      chatItemStyle: {
        sent: "rounded-xl rounded-be-0 bg-blue",
        received: "rounded-xl rounded-ts-0 bg-purple",
      },
      socket: null,
      userAccounts: this.getUserAcounts(),
      // incomingMessage: '',
      // chattingWith: {
      //   username:'',
      //   profilePicture: ''
      // }
    };
  },
  methods: {
    setCurrentConversation(receipientId, receipientUsername, profilePicture) {
      this.currentConversation.members = [receipientId, this.currentUser._id];
      this.currentConversation.chattingWith.username =  receipientUsername
      this.currentConversation.chattingWith.profilePicture =  profilePicture
    },
    getUserAcounts() {
      return [];
    },
    sendText() {
      const message = {
        senderId: this.currentUser._id,
        message: this.textValue,
        conversationId: this.currentConversation.id,
      };

      const receiverId = this.currentConversation.members.find(
        (member) => member !== this.currentUser._id
      );

      socket.emit("sendMessage", {
        senderId: this.currentUser._id,
        receiverId,
        message: this.textValue,
      });
      this.appendChat(message)
      this.textValue = "";
    },
    appendChat(incomingMessage){
      this.messageList = [...this.messageList, incomingMessage];
    }
  },
  beforeMount() {
    if (!isLoggedIn()) {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    socket.connect();
    socket.emit("setOnline", this.currentUser._id);
    socket.on("getOnlineUsers", (...onlineUsers) => {
      this.userAccounts.filter((users) =>
        onlineUsers.some((onlineUser) => onlineUser.userId === users)
      );
    });

    socket.on("pushMessage", (data) => {
      const incomingMessage = {
        id: '5',
        senderId: data.senderId,
        message: data.message,
        date: Date.now(),
      };
      this.appendChat(incomingMessage)
    });
  },
};
</script>

<style>
.layout {
  display: flex;
  width: 100vw;
}
.main {
  display: flex;
  flex-direction: column;
}
.chat-header {
  display: flex;
  background-color: #005f6a;
  padding: 3px;
  margin-top: 3px;
  color: white;
  text-align: center;
}
.messages-container {
  height: 80vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.message-wrapper {
  width: 100%;
  display: flex;
  margin-top: 5px;
}
.chat-footer {
  height: 10vh;
  max-height: 10vh;
  display: flex;
  vertical-align: middle;
}
.input-form {
  width: 100%;
}
.message-content-wrapper {
  display: flex;
  width: 50%;
}
.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
</style>
