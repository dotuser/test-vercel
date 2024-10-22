const express = require('express');
const router = express.Router();
const { login } = require('../repositories/authRepo');

router.post('/login', login);

module.exports = router;