const express = require('express');
const router = express.Router();
const challengesController = require('../controllers/challengesController');
const { validateChallenge } = require('../middleware/validator');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', auth, challengesController.getAll);
router.get('/:id', auth, challengesController.getById);
router.post('/', auth, adminAuth, validateChallenge, challengesController.create);
router.put('/:id', auth, adminAuth, validateChallenge, challengesController.update);
router.delete('/:id', auth, adminAuth, challengesController.remove);

module.exports = router;
