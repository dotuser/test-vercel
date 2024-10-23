const express = require('express');
const { verifyToken } = require('../config/jwt');
const { proVisitorToEmployee } = require('../repositories/actions');

const router = express.Router();

router.get('/promoteVisitor/:adminId/:visitorId', verifyToken, proVisitorToEmployee);

module.exports = router;