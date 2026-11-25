const db = require("../config/db");

// Get all missions
exports.getMissions = (req, res) => {
  db.query("SELECT * FROM missions WHERE status='available'", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// Complete a mission
exports.completeMission = (req, res) => {
  const { userId, missionId } = req.body;

  db.query(
    "INSERT INTO mission_completion (user_id, mission_id) VALUES (?, ?)",
    [userId, missionId],
    (err) => {
      if (err) return res.status(500).json({ error: err });

      db.query("SELECT points FROM missions WHERE id=?", [missionId], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        const points = result[0].points;
        db.query("UPDATE users SET score = score + ? WHERE id=?", [points, userId]);
        res.json({ message: "Mission completed and points added!" });
      });
    }
  );
};
