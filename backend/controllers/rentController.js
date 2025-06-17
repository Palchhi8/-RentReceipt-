const RentRecord = require('../models/RentRecord');
const Property = require('../models/Property');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

exports.addRentRecord = async (req, res) => {
  try {
    const { tenant, property, amount, date } = req.body;
    const rentRecord = await RentRecord.create({ tenant, property, amount, date });
    res.status(201).json(rentRecord);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.downloadReceipt = async (req, res) => {
  try {
    const rentRecord = await RentRecord.findById(req.params.id).populate('tenant property');
    if (!rentRecord) return res.status(404).json({ message: 'Rent record not found' });

    // Generate PDF
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../utils/receipt_${rentRecord._id}.pdf`);
    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(20).text('Rent Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Tenant: ${rentRecord.tenant.name}`);
    doc.text(`Property: ${rentRecord.property.address}`);
    doc.text(`Amount: ₹${rentRecord.amount}`);
    doc.text(`Date: ${new Date(rentRecord.date).toLocaleDateString()}`);
    doc.end();

    doc.on('finish', () => {
      res.download(filePath, `receipt_${rentRecord._id}.pdf`, (err) => {
        if (err) console.error(err);
        fs.unlinkSync(filePath); // Clean up after download
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPropertyRentHistory = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const records = await RentRecord.find({ property: propertyId }).populate('tenant property');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 