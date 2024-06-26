const express = require("express");
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController')
const fetchAllUsers = require('../controllers/fetchController');
const protect = require("../config/protect");


const Router = express.Router();



Router.post('/login', loginController);
Router.post('/register', registerController);
Router.get('/fetchUsers/:userId', protect, fetchAllUsers);


module.exports =  Router