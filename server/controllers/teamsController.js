const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const getAll = async (req, res, next) => {
  try {
    const teams = await db.allAsync('SELECT * FROM teams ORDER BY created_at DESC');
    res.json(teams);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const team = await db.getAsync('SELECT * FROM teams WHERE id = ?', [req.params.id]);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, members, color } = req.body;
    const id = uuidv4();
    
    await db.runAsync(
      'INSERT INTO teams (id, name, members, color) VALUES (?, ?, ?, ?)',
      [id, name, members, color]
    );

    const team = await db.getAsync('SELECT * FROM teams WHERE id = ?', [id]);
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, members, color } = req.body;
    
    await db.runAsync(
      'UPDATE teams SET name = ?, members = ?, color = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, members, color, req.params.id]
    );

    const team = await db.getAsync('SELECT * FROM teams WHERE id = ?', [req.params.id]);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await db.runAsync('DELETE FROM teams WHERE id = ?', [req.params.id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
