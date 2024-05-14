const express = require('express');
const UserController = require('../controllers/userController');
const login = require("../middlewares/login");

const userRouter = express.Router();

userRouter
    .route('/register')
    .post(UserController.register);

userRouter
    .route('/delete')
    .delete(login, UserController.delete);

userRouter
    .route('/groups')
    .get(login, UserController.getGroups);

module.exports = userRouter;
