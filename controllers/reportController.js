const Expense = require('../models/Expense');

exports.getSummary = async (req, res) => {
  const userId = req.user.id;
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const expenses = await Expense.find({
    userId,
    date: { $gte: start, $lte: end }
  });

  const total = expenses.reduce((acc, e) => acc + e.amount, 0);
  const byCategory = {};
  const byPayment = {};
  const byDate = {};

  expenses.forEach(e => {
    byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    byPayment[e.paymentMethod] = (byPayment[e.paymentMethod] || 0) + 1;
    const dateStr = new Date(e.date).toISOString().slice(0, 10);
    byDate[dateStr] = (byDate[dateStr] || 0) + e.amount;
  });

  const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  const topMethods = Object.entries(byPayment)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([method]) => method);

  res.json({
    total,
    topCategory,
    topMethods,
    categoryData: byCategory,
    timeSeries: byDate,
  });
};
