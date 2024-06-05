const express = require('express');
const register = require('../CONTROLLERS/user');
const router = express.Router();

router.post('/user/register', register);

module.exports = router;