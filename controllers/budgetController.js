const Budget = require('../models/Budget');
const { checkBudgetAlerts } = require('../utils/alerts');

exports.setBudget = async (req, res) => {
  const { category, monthlyLimit } = req.body;
  console.log(`user want to set the budget of ${req.body.category} amount ${req.body.monthlyLimit}`);
  
  const userId = req.user.id;
  const budget = await Budget.findOneAndUpdate(
    { userId, category },
    { monthlyLimit },
    { upsert: true, new: true }
  );
  res.json(budget);
};

exports.getBudgets = async (req, res) => {
  const budgets = await Budget.find({ userId: req.user.id });
  res.json(budgets);
};

exports.getBudgetAlert = async (req, res) => {
  const alert = await checkBudgetAlerts(req.user.id, req.params.category);
  res.json(alert || {});
};
