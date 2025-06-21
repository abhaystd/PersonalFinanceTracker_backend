const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    console.log('user is trying to add an expense', req.body);
    const expense = await Expense.create({ ...req.body, userId: req.user.id });
    
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  const { category, paymentMethod, start, end, q } = req.query;
  const query = { userId: req.user.id };

  if (category) query.category = category;
  if (paymentMethod) query.paymentMethod = paymentMethod;
  if (start && end) query.date = { $gte: new Date(start), $lte: new Date(end) };
  if (q) query.notes = { $regex: q, $options: 'i' };

  const expenses = await Expense.find(query).sort({ date: -1 });
  res.json(expenses);
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!expense) {
      console.log('Expense not found for user:', req.user);
      
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
  } catch (err) {
    console.error('Error fetching expense by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateExpense = async (req, res) => {
    console.log('user is trying to update an expense', req.body);
  const expense = await Expense.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!expense) return res.status(404).json({ error: 'Expense not found' });
  res.json(expense);
};

exports.deleteExpense = async (req, res) => {
 
  const result = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  console.log('user is trying to delete an expense', req.params.id);
  if (!result) return res.status(404).json({ error: 'Expense not found' });
  res.json({ success: true });
};
