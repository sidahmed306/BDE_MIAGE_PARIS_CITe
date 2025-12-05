const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Register new user
const register = async (req, res, next) => {
  try {
    const { username, email, password, role = 'user' } = req.body;

    // Check if user already exists
    const existingUser = await db.getAsync(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Ce nom d\'utilisateur est déjà utilisé' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
      }
      return res.status(400).json({ error: 'Un utilisateur avec ces informations existe déjà' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    try {
      await db.runAsync(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, role]
      );

      res.status(201).json({ message: 'Compte créé avec succès!' });
    } catch (dbError) {
      // Handle SQLite constraint errors
      if (dbError.code === 'SQLITE_CONSTRAINT') {
        if (dbError.message.includes('username')) {
          return res.status(400).json({ error: 'Ce nom d\'utilisateur est déjà utilisé' });
        }
        if (dbError.message.includes('email')) {
          return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }
        return res.status(400).json({ error: 'Erreur de contrainte de base de données' });
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Registration error:', error);
    next(error);
  }
};

// Login user
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await db.getAsync(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
const getMe = async (req, res, next) => {
  try {
    const user = await db.getAsync(
      'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe };
