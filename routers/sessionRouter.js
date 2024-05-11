const express = require('express');
const SessionController = require('../controllers/sessionController');
const login = require("../middlewares/login");

const sessionRouter = express.Router();

sessionRouter
    .route('/login')
    .post(SessionController.login);

sessionRouter
    .route('/verify')
    .post(SessionController.verify);

sessionRouter
    .route('/logout')
    .put(login, SessionController.logout);

module.exports = sessionRouter;
