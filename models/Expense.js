const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
