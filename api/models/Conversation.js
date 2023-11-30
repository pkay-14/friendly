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

module.exports = mongoose.model("Conversation", ConversationSchema);