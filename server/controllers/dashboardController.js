const db = require('../config/database');

const getStats = async (req, res, next) => {
  try {
    const [teams, challenges, scores] = await Promise.all([
      db.allAsync('SELECT * FROM teams'),
      db.allAsync('SELECT * FROM challenges'),
      db.allAsync(`
        SELECT s.*, t.name as teamName, t.color as teamColor
        FROM scores s
        LEFT JOIN teams t ON s.teamId = t.id
      `)
    ]);

    // Calculate team totals
    const teamTotals = teams.map(team => {
      const teamScores = scores.filter(s => s.teamId === team.id);
      const totalPoints = teamScores.reduce((sum, s) => sum + s.points, 0);
      return {
        ...team,
        totalPoints
      };
    }).sort((a, b) => b.totalPoints - a.totalPoints);

    res.json({
      totalTeams: teams.length,
      totalChallenges: challenges.length,
      totalScores: scores.length,
      topTeams: teamTotals.slice(0, 3)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats };
