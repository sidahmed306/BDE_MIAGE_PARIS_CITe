const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      errors: errors.array() 
    });
  }
  next();
};

// User validation rules
const validateRegister = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Le nom d\'utilisateur est requis')
    .isLength({ min: 3, max: 30 })
    .withMessage('Le nom d\'utilisateur doit contenir entre 3 et 30 caractères')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Le nom d\'utilisateur ne peut contenir que des lettres, chiffres et underscores'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('L\'email est requis')
    .isEmail()
    .withMessage('Veuillez fournir un email valide'),
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  handleValidationErrors
];

const validateLogin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Le nom d\'utilisateur est requis'),
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis'),
  handleValidationErrors
];

// Team validation rules
const validateTeam = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Team name is required')
    .isLength({ max: 100 })
    .withMessage('Team name must be less than 100 characters'),
  body('members')
    .trim()
    .notEmpty()
    .withMessage('Members are required'),
  body('color')
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage('Color must be a valid hex color code'),
  handleValidationErrors
];

// Challenge validation rules
const validateChallenge = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Challenge name is required and must be less than 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Challenge description is required'),
  body('maxPoints')
    .isInt({ min: 0 })
    .withMessage('Max points must be a non-negative integer'),
  handleValidationErrors
];

// Score validation rules
const validateScore = [
  body('teamId')
    .trim()
    .notEmpty()
    .withMessage('Team ID is required'),
  body('challengeId')
    .trim()
    .notEmpty()
    .withMessage('Challenge ID is required'),
  body('points')
    .isInt({ min: 0 })
    .withMessage('Points must be a positive integer'),
  body('badge')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Badge name must be less than 50 characters'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateTeam,
  validateChallenge,
  validateScore,
  handleValidationErrors
};

