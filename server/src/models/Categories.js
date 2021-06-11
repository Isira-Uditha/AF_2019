const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category: { type: String, trim: true },
    description: { type: String, trim: true },
    rooms: [{type: mongoose.Schema.Types.ObjectId, ref: 'rooms'}],
});

const CategoryModel = mongoose.model('categories', CategorySchema);
module.exports = CategoryModel;