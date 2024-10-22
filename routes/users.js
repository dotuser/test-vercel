const express = require('express');
const router = express.Router();
const { createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../repositories/userRepo');

router.post('/:userTypeId/', createUser);
router.get('/:userTypeId/', getAllUsers);
router.get('/:userTypeId/:id', getUserById);
router.patch('/:userTypeId/:id', updateUser);
router.delete('/:userTypeId/:id', deleteUser);

module.exports = router;