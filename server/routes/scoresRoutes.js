const express = require('express');
const router = express.Router();
const scoresController = require('../controllers/scoresController');
const { validateScore } = require('../middleware/validator');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', auth, scoresController.getAll);
router.get('/:id', auth, scoresController.getById);
router.post('/', auth, adminAuth, validateScore, scoresController.create);
router.put('/:id', auth, adminAuth, validateScore, scoresController.update);
router.delete('/:id', auth, adminAuth, scoresController.remove);

module.exports = router;
