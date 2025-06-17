const express = require('express');
const { getProfile, updateProfile, changePassword, uploadProfilePhoto, getRentHistory, getRentSummary } = require('../controllers/userController');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/change-password', auth, changePassword);
router.post('/profile-photo', auth, upload.single('photo'), uploadProfilePhoto);
router.get('/rent-history', auth, getRentHistory);
router.get('/rent-summary', auth, getRentSummary);

module.exports = router; 