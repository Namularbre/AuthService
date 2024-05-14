const express = require('express');
const GroupController = require('../controllers/groupController');
const login = require("../middlewares/login");

const groupRouter = express.Router();

groupRouter
    .route('/groups-users/:groupName/check')
    .get(login, GroupController.userIsInGroup);

module.exports = groupRouter;
