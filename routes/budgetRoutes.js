const express = require('express');
const auth = require('../middleware/authMiddleware');
const { setBudget, getBudgets, getBudgetAlert } = require('../controllers/budgetController');
const router = express.Router();

router.use(auth);
router.get('/', getBudgets);
router.post('/', setBudget);
router.get('/alert/:category', getBudgetAlert);

module.exports = router;
