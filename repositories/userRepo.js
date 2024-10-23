const User = require('../models/Users');
const { doesCnicExist, doesEmailExist, doesContactNoExist, isValidCnic, isValidMobileNo, isValidEmail } = require('../helper/UserHelper');

// Create User
const createUser = async (req, res) => {
  try {
    const userTypeId = req.params.userTypeId;
    const cnic = req.body.cnic;
    const email = req.body.email;
    const mobileNo = req.body.mobileNo;

    const cnicRegistered = await doesCnicExist(cnic);
    const emailExists = await doesEmailExist(email);
    const mobileNoExists = await doesContactNoExist(mobileNo);

    if (cnicRegistered) {
      return res.status(400).json({ message: 'CNIC is already Registered'});
    }

    if (emailExists) {
      return res.status(400).json({ message: 'Email is already Registered'});
    }

    if (mobileNoExists) {
      return res.status(400).json({ message: 'Mobile Number is already Registered'});
    }
    
    const user = new User({
      ...req.body,
      userTypeId: userTypeId,
      isActive: true
    });

    await user.save();
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
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
    const user = await User.findOne({ _id: userId, isActive: true });
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
    // const userTypeId = req.params.userTypeId;
    const userId = req.params.id;
    const cnic = req.body.cnic;
    const email = req.body.email;
    const mobileNo = req.body.mobileNo;

    const validateCnic = isValidCnic(cnic);
    const validateEmail = isValidEmail(email);
    const validateMobileNo = isValidMobileNo(mobileNo);

    if (cnic && !validateCnic) {
      return res.status(400).json({ message: 'Invalid CNIC' });
    }

    if (email && !validateEmail) {
      return res.status(400).json({ message: 'Invalid CNIC' });
    }

    if (mobileNo && !validateMobileNo) {
      return res.status(400).json({ message: 'Invalid CNIC' });
    }

    const cnicRegistered = cnic && await doesCnicExist(cnic);
    const emailExists = email && await doesEmailExist(email);
    const mobileNoExists = mobileNo && await doesContactNoExist(mobileNo);

    if (cnic && cnicRegistered) {
      return res.status(400).json({ message: 'CNIC is already Registered'});
    }

    if (email && emailExists) {
      return res.status(400).json({ message: 'Email is already Registered'});
    }

    if (mobileNo && mobileNoExists) {
      return res.status(400).json({ message: 'Mobile Number is already Registered'});
    }
    
    const user = await User.findOneAndUpdate(
      { _id: userId, isActive: true },
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