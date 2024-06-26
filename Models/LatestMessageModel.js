const mongoose = require('mongoose');


const MessageSchema = mongoose.Schema({
    sender : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reciever : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    chat : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
},
{
    timeStamp: true
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message