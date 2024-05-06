const express = require('express');
const SessionController = require('../controllers/sessionController');

const sessionRouter = express.Router();

sessionRouter
    .route('/login')
    .post(SessionController.create);

sessionRouter
    .route('/verify')
    .post(SessionController.verify);

module.exports = sessionRouter;
