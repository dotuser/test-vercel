const User = require('../models/Users');

//  EMAIL
const isValidEmail = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const doesEmailExist = async email => {
  try {
    if (isValidEmail(email)) {
      const user = await User.findOne({ email });
      return !!user;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};


//  MOBILE #
const isValidMobileNo = contact => {
  return /^[0-9]{11}$/.test(contact); 
};

const doesContactNoExist = async mobileNo => {
  try {
    const isValidContactNo = isValidMobileNo(mobileNo);
    if (isValidContactNo) {
      const user = await User.findOne({ mobileNo });
      return !!user;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

//  CNIC
const isValidCnic = cnic => {
  return typeof cnic === 'string' && /^[0-9]{13}$/.test(cnic);
};

const doesCnicExist = async cnic => {
  try {
    const isValidNic = isValidCnic(cnic);
    if (isValidNic) {
      const user = await User.findOne({ cnic });
      return !!user;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { doesCnicExist, isValidCnic, isValidMobileNo, doesContactNoExist, isValidEmail, doesEmailExist };