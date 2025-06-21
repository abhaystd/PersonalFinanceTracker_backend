const express = require('express');
const auth = require('../middleware/authMiddleware');
const { getSummary } = require('../controllers/reportController');
const router = express.Router();

router.use(auth);
router.get('/summary', getSummary);

module.exports = router;
