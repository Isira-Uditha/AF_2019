const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('supertest');
const categoryAPI = require('../api/category.api');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
jest.setTimeout(18000);

const PORT = process.env.TESTPORT || 8086;
const MONGODB_URL = process.env.TESTMONGODB_URL;

mongoose.connect(MONGODB_URL || '&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        console.log('Database Error: ', error.message);
    }
});

mongoose.connection.once('open', () => {
    console.log('Database Synced');
});

app.route('/').get((req, res) => {
    res.send('SLIIT AF PRACTICE TEST');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

app.use('/category', categoryAPI());

test('should insert a new category', async () => {
    await request(app).post('/category/create').send({
        category: "CDA-2312",
        description: "luxury",
        rooms: []

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})



