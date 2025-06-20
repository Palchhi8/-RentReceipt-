const express = require('express');
const sendEmail = require('../utils/email');
const router = express.Router();

router.post('/send-test-email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    await sendEmail(to, subject, text);
    res.json({ message: 'Email sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send email', error: err.message });
  }
});

module.exports = router; 