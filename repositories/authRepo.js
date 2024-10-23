const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const { tokenBlacklist } = require('../config/jwt');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.userTypeId == '3') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (token) {
      tokenBlacklist.add(token);
      res.status(200).json({ message: 'Logged out successfully' });
    } else {
      res.status(400).json({ message: 'No token provided' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const setUpdatePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.userTypeId == '3') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (user.password) {
      console.log('Checking Password');
      
      const isValidOldPassword = await bcrypt.compare(oldPassword, user.password);

      if (!isValidOldPassword) {
        return res.status(401).json({ message: 'Invalid old password' });
      }
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    await User.findOneAndUpdate({ email }, { password: hashedNewPassword }, { new: true });
    // await User.findByIdAndUpdate(id, { password: hashedNewPassword }, { new: true });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { login, logout, setUpdatePassword };