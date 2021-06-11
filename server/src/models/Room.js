const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    code: { type: String, required: true, trim: true },
    amount: { type: Number },
    wing: { type: String, trim: true },
    pax: { type: Number },
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'categories'}],
});

const RoomModel = mongoose.model('rooms', RoomSchema);
module.exports = RoomModel;