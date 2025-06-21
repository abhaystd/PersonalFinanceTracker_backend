const Expense = require('../models/Expense');
const Budget = require('../models/Budget');

exports.checkBudgetAlerts = async (userId, category) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const expenses = await Expense.aggregate([
    { $match: { userId, category, date: { $gte: start, $lte: end } } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);

  const total = expenses[0]?.total || 0;
  const budget = await Budget.findOne({ userId, category });

  if (!budget) return null;

  const percent = (total / budget.monthlyLimit) * 100;
  if (percent >= 100) return { level: 'over', percent };
  if (percent >= 80) return { level: 'warning', percent };
  return null;
};
