const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');

router.use(auth);
router.get('/', getExpenses);
router.post('/', addExpense);
router.get('/:id', getExpenseById); 
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
