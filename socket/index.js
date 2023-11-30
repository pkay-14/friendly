const io = require("socket.io")(8900, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:8080"],
    },
  });
let onlineUsers = [];

const addOnlineUser = (userId, socketId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
  };
  
  const removeOnlineUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  };
  
  const getOnlineUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId);
  };
io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected.`);
    
    socket.on("setOnline", (userId) => {
        addOnlineUser(userId, socket.id);
        console.log(onlineUsers)
        io.emit("getOnlineUsers", onlineUsers);
      });

    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
        const user = getOnlineUser(receiverId);
        io.to(user.socketId).emit("pushMessage", {
            senderId,
            message,
        });
    })

    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected!`);
        removeOnlineUser(socket.id);
        io.emit("getUsers", onlineUsers);
    });
})