const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../data/database.db');
const dbDir = path.dirname(dbPath);

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    // Promisify database methods first
    promisifyMethods();
    initializeDatabase();
  }
});

// Promisify database methods
function promisifyMethods() {
  db.runAsync = function (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ lastID: this.lastID, changes: this.changes });
        }
      });
    });
  };

  db.getAsync = function (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  };

  db.allAsync = function (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
}

// Initialize database tables
async function initializeDatabase() {
  const bcrypt = require('bcryptjs');
  
  // Users table
  await new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Teams table
  await new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS teams (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        members TEXT NOT NULL,
        color TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Challenges table
  await new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS challenges (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        maxPoints INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Scores table
  await new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS scores (
        id TEXT PRIMARY KEY,
        teamId TEXT NOT NULL,
        challengeId TEXT NOT NULL,
        points INTEGER NOT NULL,
        badge TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teamId) REFERENCES teams(id) ON DELETE CASCADE,
        FOREIGN KEY (challengeId) REFERENCES challenges(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  console.log('Database tables initialized');
  
  // Create default admin user if it doesn't exist
  try {
    const existingAdmin = await db.getAsync(
      'SELECT * FROM users WHERE username = ?',
      ['admin']
    );

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('00000000', 10);
      await db.runAsync(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@nuitinfo.com', hashedPassword, 'admin']
      );
      console.log('✅ Default admin user created:');
      console.log('   Username: admin');
      console.log('   Password: 00000000');
      console.log('   Role: admin');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating default admin user:', error);
  }
}

module.exports = db;
