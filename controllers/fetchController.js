
const expressAsyncHandler = require("express-async-handler");
const UserModel = require('../Models/UserModel')



const fetchAllUsers = expressAsyncHandler(async (req, res) => {
    try {
        const {userId} = req.params;
        const users = await UserModel.find({_id: {$ne: userId}})
        const filteredResult = users.map(each => ({id: each.id, name: each.name, email: each.email}))
        res.status(200).json({filteredResult})
    }catch(err) {
        res.status(500).json({message: "Internal server Error"})
    }

});


module.exports = fetchAllUsers