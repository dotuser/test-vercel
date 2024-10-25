const express = require('express');
const { verifyToken } = require('../config/jwt');
const { proVisitorToEmployee, proEmployeeToAdmin, demAdminToEmployee } = require('../repositories/actions');

const router = express.Router();

router.get('/promoteVisitor/:adminId/:visitorId', verifyToken, proVisitorToEmployee);
router.get('/promoteEmployee/:adminId/:employeeId', verifyToken, proEmployeeToAdmin);
router.get('/demoteAdmin/:defAdminId/:adminId', verifyToken, demAdminToEmployee);

module.exports = router;