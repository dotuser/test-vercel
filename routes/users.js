const express = require('express');
const { verifyToken, authenticate } = require('../config/jwt');
const { createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../repositories/userRepo');

const router = express.Router();

router.post('/:userTypeId/', authenticate, createUser);
router.get('/:userTypeId/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;