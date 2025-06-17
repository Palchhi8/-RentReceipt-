const Property = require('../models/Property');

exports.addProperty = async (req, res) => {
  try {
    const { address, tenants } = req.body;
    const property = await Property.create({
      landlord: req.user.id,
      address,
      tenants,
    });
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProperties = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'landlord') {
      query.landlord = req.user.id;
    } else if (req.user.role === 'tenant') {
      query.tenants = req.user.id;
    }
    const properties = await Property.find(query).populate('tenants', 'name email');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 