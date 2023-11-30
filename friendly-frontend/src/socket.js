import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  pushMessageEvents: [],
  getOnlineUsersEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.VUE_APP_ENV === "production" ? undefined : process.env.VUE_APP_SOCKET_URL;

export const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("pushMessage", (...data) => {
   state.pushMessageEvents.push(data)
});

socket.on("getOnlineUsers", (...users) => {
   state.getOnlineUsersEvents.push({...users})  
});