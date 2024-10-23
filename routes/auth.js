const express = require('express');
const { verifyToken } = require('../config/jwt');
const { login, logout, setUpdatePassword } = require('../repositories/authRepo');

const router = express.Router();

router.post('/login', login);
router.get('/logout', verifyToken, logout);
router.post('/api/setPassword', verifyToken, setUpdatePassword);

module.exports = router;