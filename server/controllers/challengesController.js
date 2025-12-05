const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const getAll = async (req, res, next) => {
  try {
    const challenges = await db.allAsync('SELECT * FROM challenges ORDER BY created_at DESC');
    res.json(challenges);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const challenge = await db.getAsync('SELECT * FROM challenges WHERE id = ?', [req.params.id]);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    res.json(challenge);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, description, maxPoints } = req.body;
    const id = uuidv4();
    
    await db.runAsync(
      'INSERT INTO challenges (id, name, description, maxPoints) VALUES (?, ?, ?, ?)',
      [id, name, description, maxPoints]
    );

    const challenge = await db.getAsync('SELECT * FROM challenges WHERE id = ?', [id]);
    res.status(201).json(challenge);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, description, maxPoints } = req.body;
    
    await db.runAsync(
      'UPDATE challenges SET name = ?, description = ?, maxPoints = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, description, maxPoints, req.params.id]
    );

    const challenge = await db.getAsync('SELECT * FROM challenges WHERE id = ?', [req.params.id]);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    res.json(challenge);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await db.runAsync('DELETE FROM challenges WHERE id = ?', [req.params.id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    res.json({ message: 'Challenge deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
