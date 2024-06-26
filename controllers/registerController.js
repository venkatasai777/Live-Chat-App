const express = require("express");
const userModel = require('../Models/UserModel');
const generateToken = require('../config/generateToken')
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")


const registerController = expressAsyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    //pre existing User
        const isUserExists = await userModel.findOne({email})
    if (isUserExists) {
        res.status(409).json({message: "Email Already Exists"})
    }

    const isUserNameExists = await userModel.findOne({name})
    if (isUserNameExists) {
        res.status(409).json({message: "UserName Already Exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = userModel.create({name, email, password: hashedPassword})

    if (user) {
        res.status(201).json({message: "User Added successfully", name, id: user._id },)
    }else {
        res.status(500).json({message: "Internal server Error"})
    }
});


module.exports = registerController