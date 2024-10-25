const express = require('express');
const { verifyToken, authenticate } = require('../config/jwt');
const { createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../repositories/userRepo');

const router = express.Router();

router.post('/user/:userTypeId/', authenticate, createUser);
router.get('/users/:userTypeId/', verifyToken, getAllUsers);
router.get('/user/:id', verifyToken, getUserById);
router.put('/user:id', verifyToken, updateUser);
router.delete('/user/:id', verifyToken, deleteUser);

module.exports = router;