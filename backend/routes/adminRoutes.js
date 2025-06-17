const express = require('express');
const { getAllUsers, deleteUser, createAnnouncement, getAnnouncements } = require('../controllers/adminController');
const { auth, roleCheck } = require('../middleware/auth');
const router = express.Router();

router.get('/users', auth, roleCheck('admin'), getAllUsers);
router.delete('/user/:id', auth, roleCheck('admin'), deleteUser);
router.post('/announcement', auth, roleCheck('admin'), createAnnouncement);
router.get('/announcements', auth, roleCheck('admin'), getAnnouncements);

module.exports = router; 