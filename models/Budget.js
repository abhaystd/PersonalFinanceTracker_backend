const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true },
  monthlyLimit: { type: Number, required: true },
});

module.exports = mongoose.model('Budget', budgetSchema);
