require('dotenv').config();
const express = require('express');
const app = express();
const DB = require('./DATABASE/db.js')

const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server Started!!");
})

// importing routes
const userRoutes = require('./ROUTES/user.js');

// using routes
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
    DB();
})