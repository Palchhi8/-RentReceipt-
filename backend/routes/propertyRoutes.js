const express = require('express');
const { addProperty, getProperties } = require('../controllers/propertyController');
const { auth, roleCheck } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, roleCheck('landlord'), addProperty);
router.get('/', auth, getProperties);

module.exports = router; 