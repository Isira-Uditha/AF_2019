const Room = require('../models/Room');
const mongoose = require('mongoose').set('debug', true);

const createRoom = async (req, res) => {
    if (req.body) {
        const room = new Room(req.body);
        await room.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllRooms = async (req, res) => {
    await Room.find({})
        .populate('categories', 'category description')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

module.exports = {
    createRoom,
    getAllRooms
};