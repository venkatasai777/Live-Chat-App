const User = require('../Models/UserModel');
const Chat = require('../Models/ChatModel')
const expressAsyncHandler = require("express-async-handler");


const accessChat = expressAsyncHandler( async () => {
    const {userId} = req.body ;
    if (!userId) {
        console.log('userId paramnot sent to the request')
        return res.sendStatus(400)
    }

    var isChat = await Chat.find({
        $and : [
            {users: {$elemMatch : {$eq: req.user._id}}},
            {users: {$elemMatch : {$eq: userId}}}
        ]
    }).populate("latestMessage") 

    isChat = await User.populate(isChat, {
        path:"latestMessage.sender",
        select : "name email"
    })


    if (isChat.length > 0) {
        res.send(isChat[0])
    }else {
        var chatData = {
            chatName: "sender",
            users: [req.user._id, userId]
        }

        try {
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({_id: createdChat._id})
            res.status(200).json(fullChat)
            
        }catch(err) {
            res.status(400).json({message: "Bad Request"})
        }
    }

    



});

module.exports = accessChat