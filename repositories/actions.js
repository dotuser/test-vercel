
const User = require('../models/Users');


const proVisitorToEmployee = async (req, res) => {
  const visitorId = req.params.visitorId;
  const adminId = req.params.adminId;
  try {
    const adminUser = await User.findById(adminId);
    const visitorUser = await User.findById(visitorId);
  
    if (!adminUser || !visitorUser) {
      return res.status(404).json({ message: 'Admin or Visitor not found' });
    }
  
    if (adminUser.userTypeId === 1 && visitorUser.userTypeId === 3) {
      visitorUser.userTypeId = 2;
      await visitorUser.save();
      return res.status(200).json({ message: 'Visitor Successfully Promoted to Employee' });
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
  

module.exports = { proVisitorToEmployee };