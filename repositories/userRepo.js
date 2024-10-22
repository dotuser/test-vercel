const User = require('../models/Users');
const { findUserByCnic } = require('../helper/UserHelper');
// const bcrypt = require('bcrypt');

// Create User
const createUser = async (req, res) => {
  try {
    const userTypeId = req.params.userTypeId;
    const cnic = req.body.cnic;
    // console.log(findUserByCnic(cnic));
    // if (cnic) {
        
    // }


    // // const hashedPassword = await bcrypt.hash(req.body.password, 12);
    // const user = new User({
    //   ...req.body,
    // //   password: hashedPassword,
    //   userTypeId: userTypeId,
    //   isActive: true
    // });
    // await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const userTypeId = req.params.userTypeId;
    const users = await User.find({ isActive: true, userTypeId: userTypeId });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const userTypeId = req.params.userTypeId;
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId, isActive: true, userTypeId: userTypeId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const userTypeId = req.params.userTypeId;
    const userId = req.params.id;
    const user = await User.findOneAndUpdate(
      { _id: userId, isActive: true, userTypeId: userTypeId },
      { $set: { ...req.body } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete (Deactivate) User
const deleteUser = async (req, res) => {
  try {
    const userTypeId = req.params.userTypeId;
    const userId = req.params.id;
    const user = await User.findOneAndUpdate(
      { _id: userId, isActive: true, userTypeId: userTypeId },
      { $set: { isActive: false } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deactivated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};