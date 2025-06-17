const RentRecord = require('../models/RentRecord');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const path = require('path');

exports.getProfile = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    profilePhoto: req.user.profilePhoto,
  });
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    req.user.name = name || req.user.name;
    req.user.email = email || req.user.email;
    await req.user.save();
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const isMatch = await req.user.comparePassword(oldPassword);
    if (!isMatch) return res.status(400).json({ message: 'Old password incorrect' });
    req.user.password = newPassword;
    await req.user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    req.user.profilePhoto = path.join('uploads', req.file.filename);
    await req.user.save();
    res.json({ message: 'Profile photo updated', profilePhoto: req.user.profilePhoto });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRentHistory = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'tenant') {
      query.tenant = req.user.id;
    } else if (req.user.role === 'landlord') {
      query.property = { $in: req.user.properties };
    }
    const rentHistory = await RentRecord.find(query).populate('property tenant');
    res.json(rentHistory);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRentSummary = async (req, res) => {
  try {
    if (req.user.role !== 'tenant') return res.status(403).json({ message: 'Access denied' });
    const records = await RentRecord.find({ tenant: req.user.id });
    const totalPaid = records.reduce((sum, r) => sum + r.amount, 0);
    res.json({ totalPaid, monthsPaid: records.length });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 