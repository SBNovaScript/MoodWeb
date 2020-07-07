const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 1 // limit each IP to 10 requests per windowMs
});

// Setting up middleware
app.use(helmet())
app.use(cors());
app.use(limiter);
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connected successfully!');
})

const moodsRouter = require('./routes/moods');
const usersRouter = require('./routes/users');

app.use('/moods', moodsRouter);
app.use('/users', usersRouter);

// Starting server
app.listen(port, () => {
    console.log(`Server on port ${port}!`);
})