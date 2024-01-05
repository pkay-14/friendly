<template>
  <v-card v-if="currentUser" data-testid="homeView">
    <v-layout class="layout">
      <RightNav :currentUser="currentUser" @setCurrentConversation="setCurrentConversation"/>
      <v-main class="main" style="height: 100vh">
        <div v-if="currentConversation.chattingWith.username.length != 0">
          <div class="chat-header px-10 py-4">
            <v-avatar size="x-large" color="surface-variant">
              <v-img
                :src="currentConversation.chattingWith.profilePicture 
                ? currentConversation.chattingWith.profilePicture 
                : 'noImage.png'"
              ></v-img>
            </v-avatar>
            <h1 class="pl-5 pt-1">{{currentConversation.chattingWith.username}}</h1>
          </div>
          <v-list ref="messagesContainer" class="messages-container px-2 py-1">
            <div
              v-for="message in state.messages"
              :key="message.id"
              :class="
                message.senderId == currentUser._id
                  ? divStyles.chatUpperDiv.sent
                  : divStyles.chatUpperDiv.received
              "
            >
              <div
                :class="
                  message.senderId == currentUser._id
                    ? divStyles.chatInnerDiv.sent
                    : divStyles.chatInnerDiv.received
                "
              >
                <v-list-item
                  :class="
                    message.senderId == currentUser._id
                      ? divStyles.chatItemStyle.sent
                      : divStyles.chatItemStyle.received
                  "
                >
                  <p id="message" class="text-left py-2">
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

<script setup>
  import RightNav from "../components/RightNav.vue";
  import { useRouter } from 'vue-router'
  import { isLoggedIn } from "../lib/helperMethods";
  import { socket, state } from "@/socket";
  import { ref, reactive, onBeforeMount, onMounted, computed} from "vue"

  const router = useRouter()

  onBeforeMount(() => {
    if (!isLoggedIn()) {
      router.push({ name: "login" });
    }
  })

  onMounted(() => {
    if (currentUser){
      socket.connect();
      socket.emit("setOnline", currentUser._id);
      // socket.on("getOnlineUsers", (...onlineUsers) => {
      //   userAccounts.filter((users) =>
      //     onlineUsers.some((onlineUser) => onlineUser.userId === users)
      //     );
      //   })
    }
  
  })

  const currentUser = JSON.parse(localStorage.getItem("userData"))
  const messagesContainer = ref(null)
  const messages = computed(() => state.messages)
  let textValue =  ""

  const currentConversation = reactive({
    members: [],
    id: '',
    chattingWith:{
      username: '',
      profilePicture: ''
    }
  })

  const divStyles = {
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
    }
  }

  const setCurrentConversation = (receipientId, receipientUsername, profilePicture) => {
    state.messages = []
    currentConversation.members = [receipientId, currentUser._id];
    currentConversation.chattingWith.username =  receipientUsername
    currentConversation.chattingWith.profilePicture =  profilePicture
  }

  const getUserAcounts = () => {
      return [];
  }

  const sendText = () => {
      const message = {
        senderId: currentUser._id,
        message: textValue,
        conversationId: currentConversation.id,
      };
      const receiverId = currentConversation.members.find(
        (member) => member !== currentUser._id
      );

      socket.emit("sendMessage", {
        senderId: currentUser._id,
        receiverId,
        message: textValue,
      });
      appendChat(message)
      textValue = "";
  }
  
  const appendChat = (incomingMessage) => {
      state.appendMessage(incomingMessage)
      const container = messagesContainer.value
      if (container){
        container.scrollTop = container.scrollHeight;
      }
  }
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
