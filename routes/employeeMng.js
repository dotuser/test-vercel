const express = require('express');
// const { verifyToken } = require('../config/jwt');
const { createEmployee, getAllEmployees, getEmployee, updateEmployee, deleteEmployee } = require('../repositories/employeeMngRepo');

const router = express.Router();

router.post('/AddEmployee', createEmployee, );
router.get('/GetAllEmployees/:adminId', getAllEmployees, );
router.get('/GetEmployee/:id', getEmployee, );
router.put('/UpdateEmployee', updateEmployee, );
router.delete('/DeleteEmployee', deleteEmployee, );

module.exports = router;