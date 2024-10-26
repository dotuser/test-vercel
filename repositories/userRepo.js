const User = require('../models/Users');
const { doesCnicExist, doesEmailExist, doesContactNoExist, isValidCnic, isValidMobileNo, isValidEmail } = require('../helper/UserHelper');
const path = require("path");
const fs = require("fs");

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

    if (cnicRegistered) return res.status(400).json({ message: 'CNIC is already Registered'});
    if (emailExists) return res.status(400).json({ message: 'Email is already Registered'});
    if (mobileNoExists) return res.status(400).json({ message: 'Mobile Number is already Registered'});
  
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
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId, isActive: true });

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { cnic, email, mobileNo } = req.body;

  try {
    const user = await User.findOne({ _id: userId, isActive: true });
    if (!user) return res.status(404).json({ message: 'User not found or not active' });

    if (cnic && !isValidCnic(cnic)) return res.status(400).json({ message: 'Invalid CNIC' });
    if (email && !isValidEmail(email)) return res.status(400).json({ message: 'Invalid Email Address' });
    if (mobileNo && !isValidMobileNo(mobileNo)) return res.status(400).json({ message: 'Invalid Mobile Number' });

    const [cnicRegistered, emailExists, mobileNoExists] = await Promise.all([
      cnic ? doesCnicExist(cnic) : false,
      email ? doesEmailExist(email) : false,
      mobileNo ? doesContactNoExist(mobileNo) : false,
    ]);

    if (cnic && cnicRegistered) return res.status(400).json({ message: 'CNIC is already registered' });
    if (email && emailExists) return res.status(400).json({ message: 'Email is already registered' });
    if (mobileNo && mobileNoExists) return res.status(400).json({ message: 'Mobile Number is already registered' });

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, isActive: true },
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating the user' });
  }
};


// const updateUser = async (req, res) => {
//   const userId = req.params.id;
//   const cnic = req.body.cnic;
//   const email = req.body.email;
//   const mobileNo = req.body.mobileNo;

//   try {
//     const user = User.findById(userId);

//     if (!user) return res.status(404).json({ message: 'User not found' });
//     if (!user.isActive) return res.status(400).json({ message: 'Bad Request' });

//     const validateCnic = isValidCnic(cnic);
//     const validateEmail = isValidEmail(email);
//     const validateMobileNo = isValidMobileNo(mobileNo);

//     if (cnic && !validateCnic) return res.status(400).json({ message: 'Invalid CNIC' });
//     if (email && !validateEmail) return res.status(400).json({ message: 'Invalid Email Address' });
//     if (mobileNo && !validateMobileNo) return res.status(400).json({ message: 'Invalid Mobile Number' });

//     const cnicRegistered = cnic && await doesCnicExist(cnic);
//     const emailExists = email && await doesEmailExist(email);
//     const mobileNoExists = mobileNo && await doesContactNoExist(mobileNo);

//     if (cnic && cnicRegistered) return res.status(400).json({ message: 'CNIC is already Registered'});
//     if (email && emailExists) return res.status(400).json({ message: 'Email is already Registered'});
//     if (mobileNo && mobileNoExists) return res.status(400).json({ message: 'Mobile Number is already Registered'});
  
//     const user = await User.findOneAndUpdate(
//       { _id: userId, isActive: true },
//       { $set: { ...req.body } },
//       { new: true }
//     );
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Delete (Deactivate) User
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOneAndUpdate(
      { _id: userId, isActive: true },
      { $set: { isActive: false } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User deactivated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const uploadCV = async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  
  const userId = req.params.userId;
  const fileName = req.file.filename;
  
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, isActive: true },
      { $set: { 'professionalDetails.cv': fileName }},
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const downloadCV = async (req, res) => {
  try {
    const { userId, adminId } = req.body;

    if (adminId) {
      const admin = await User.findById({ _id: adminId, userTypeId: 1, isActive: true });
      if (!admin) return res.status(404).json({ message: 'Admin User not found' });
    }

    const user = await User.findById({ _id: userId, isActive: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const filePath = path.resolve(__dirname, '../uploads', user.professionalDetails.cv);
    console.log('File Path:', filePath);

    if (!fs.existsSync(filePath)) return res.status(404).send('File not found');

    res.download(filePath, (err) => {
      if (err) return res.status(500).send('Error downloading file.');
    });
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
  uploadCV,
  downloadCV
};