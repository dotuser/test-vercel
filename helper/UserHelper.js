const User = require('../models/Users');

const findUserByCnic = async cnic => {
  try {
    const user = await User.findOne({ cnic });
    console.log(user);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { findUserByCnic };