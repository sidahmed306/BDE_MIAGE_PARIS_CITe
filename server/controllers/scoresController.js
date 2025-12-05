const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const getAll = async (req, res, next) => {
  try {
    const scores = await db.allAsync(`
      SELECT 
        s.*,
        t.name as teamName,
        t.color as teamColor,
        c.name as challengeName
      FROM scores s
      LEFT JOIN teams t ON s.teamId = t.id
      LEFT JOIN challenges c ON s.challengeId = c.id
      ORDER BY s.created_at DESC
    `);
    res.json(scores);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const score = await db.getAsync(`
      SELECT 
        s.*,
        t.name as teamName,
        c.name as challengeName
      FROM scores s
      LEFT JOIN teams t ON s.teamId = t.id
      LEFT JOIN challenges c ON s.challengeId = c.id
      WHERE s.id = ?
    `, [req.params.id]);
    
    if (!score) {
      return res.status(404).json({ error: 'Score not found' });
    }
    res.json(score);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { teamId, challengeId, points, badge } = req.body;
    const id = uuidv4();
    
    await db.runAsync(
      'INSERT INTO scores (id, teamId, challengeId, points, badge) VALUES (?, ?, ?, ?, ?)',
      [id, teamId, challengeId, points, badge || null]
    );

    const score = await db.getAsync(`
      SELECT 
        s.*,
        t.name as teamName,
        c.name as challengeName
      FROM scores s
      LEFT JOIN teams t ON s.teamId = t.id
      LEFT JOIN challenges c ON s.challengeId = c.id
      WHERE s.id = ?
    `, [id]);
    
    res.status(201).json(score);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { teamId, challengeId, points, badge } = req.body;
    
    await db.runAsync(
      'UPDATE scores SET teamId = ?, challengeId = ?, points = ?, badge = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [teamId, challengeId, points, badge || null, req.params.id]
    );

    const score = await db.getAsync(`
      SELECT 
        s.*,
        t.name as teamName,
        c.name as challengeName
      FROM scores s
      LEFT JOIN teams t ON s.teamId = t.id
      LEFT JOIN challenges c ON s.challengeId = c.id
      WHERE s.id = ?
    `, [req.params.id]);
    
    if (!score) {
      return res.status(404).json({ error: 'Score not found' });
    }
    res.json(score);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await db.runAsync('DELETE FROM scores WHERE id = ?', [req.params.id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Score not found' });
    }
    res.json({ message: 'Score deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
