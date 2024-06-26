const mongoose = require('mongoose')

const ChatModelSchema = mongoose.Schema({
    chatName: {
        type: String
    },
    users : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
},
{
    timeStamp: true
})

const Chat = mongoose.model("Chat", ChatModelSchema)
module.exports = Chat