const db = require("../config/db");

// Register a new user
exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;
  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "User registered successfully" });
    }
  );
};

// Get Leaderboard
exports.getLeaderboard = (req, res) => {
  db.query("SELECT name, score FROM users ORDER BY score DESC LIMIT 10", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};
