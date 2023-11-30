const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
      participants: {
        type: Array,
        require: true,
        unique: true,
      }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Conversation", ConversationSchema);const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        sender_id: {
            type: String,
            require: true
        }, 
        text: {
            type: String,
            require: true,
        },
        Conversation: {
            type: mongoose.Types.ObjectId, 
            ref: "Conversation",
        },


    

    },
    { timestamps: true }
)

module.exports = mongoose.model("Message", MessageSchema);
