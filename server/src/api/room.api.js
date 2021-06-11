const express = require('express');
const router = express.Router();
const controller = require('../controllers/room.controller');

module.exports = function () {
    router.post('/create', controller.createRoom);
    router.get('/', controller.getAllRooms);
    return router;
}
