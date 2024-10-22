const User = require('../models/Users');
const bcrypt = require('bcrypt');

// Create User
const login = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = new User({
      ...req.body,
      password: hashedPassword,
      isActive: true
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = { login };