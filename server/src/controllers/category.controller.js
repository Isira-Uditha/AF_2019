const Category = require('../models/Categories');
const mongoose = require('mongoose').set('debug', true);

const createCategory = async (req, res) => {
    if (req.body) {
        const category = new Category(req.body);
        await category.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllCategories = async (req, res) => {
    await Category.find({})
        .populate('categories', 'category description')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getRoomForCategory = async (req, res) => {
    if (req.params && req.params.id) {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Category With That id');
        await Category.findById(req.params.id)
            .populate("rooms","code amount wing pax")
            .then(data => {
                res.status(200).send({ data : data });
                // console.log(data);
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getTotalCost = async (req, res) => {
    console.log("xxxxx");
    if (req.params && req.params.id) {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Category With That id');
        const categories = await Category.findById(req.params.id).populate("rooms","amount");
        let totalCost = 0;

        if (categories.rooms.length > 0) {
            categories.rooms.map((room) => {
                totalCost += room.amount;
            });
        }

        res.status(200).send({ totalCost: totalCost });
    }
}


module.exports = {
    getAllCategories,
    getRoomForCategory,
    createCategory,
    getTotalCost
};