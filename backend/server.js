const express = require('express');
const cors = require('cors');
const config = require("./config.json");
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors ());
app.use(express.json());

const uri = config.mongodbs;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Is database in mongodb running...');
});

const usuariosRouter = require('./routes/users');
app.use('/usuarios', usuariosRouter);

app.listen(port, () => {
    console.log('Is backend running...');
});