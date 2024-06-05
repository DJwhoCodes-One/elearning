require('dotenv').config();
const express = require('express');
const app = express();
const DB = require('./DATABASE/db.js')

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Server Started!!");
})

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
    DB();
})