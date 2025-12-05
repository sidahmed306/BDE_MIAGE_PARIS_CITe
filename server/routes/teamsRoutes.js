const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController');
const { validateTeam } = require('../middleware/validator');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', auth, teamsController.getAll);
router.get('/:id', auth, teamsController.getById);
router.post('/', auth, validateTeam, teamsController.create); // Allow all authenticated users to create teams
router.put('/:id', auth, adminAuth, validateTeam, teamsController.update); // Only admins can update
router.delete('/:id', auth, adminAuth, teamsController.remove); // Only admins can delete

module.exports = router;
