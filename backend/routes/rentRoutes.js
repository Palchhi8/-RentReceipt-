const express = require('express');
const { addRentRecord, downloadReceipt, getPropertyRentHistory } = require('../controllers/rentController');
const { auth, roleCheck } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, roleCheck('landlord'), addRentRecord);
router.get('/receipt/:id', auth, downloadReceipt);
router.get('/history/:propertyId', auth, roleCheck('landlord'), getPropertyRentHistory);

module.exports = router; 