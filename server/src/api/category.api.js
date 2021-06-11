const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');

module.exports = function () {
    router.post('/create', controller.createCategory);
    router.get('/', controller.getAllCategories);
    router.get('/:id', controller.getRoomForCategory);
    router.get('/calculate/:id', controller.getTotalCost);
    return router;
}