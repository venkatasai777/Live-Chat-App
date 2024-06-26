const express = require("express");
const userModel = require('../Models/UserModel');
const generateToken = require('../config/generateToken')
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")


const loginController = expressAsyncHandler(async (req, res) => {
    const {name, password} = req.body

    //pre existing User
        const existingUser = await userModel.findOne({name})
    if (!existingUser) {
        res.status(401).json({message: "User Does not Exists, check credentials once"})
    }

    const hashedPassword = bcrypt.compare(password, existingUser.password)
    if (hashedPassword) {
        res.status(201).json({message: "Login successfully", token: generateToken(existingUser._id), name: existingUser.name, id: existingUser._id}) 
    } else {
        res.status(500).json({message: "Internal server Error"})
    }
});


module.exports = loginController