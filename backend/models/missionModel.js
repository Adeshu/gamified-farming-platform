const db = require("../config/db");

// Create Missions Table if not exists
db.query(`CREATE TABLE IF NOT EXISTS missions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  points INT NOT NULL,
  status ENUM('available','inactive') DEFAULT 'available'
)`);

db.query(`CREATE TABLE IF NOT EXISTS mission_completion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  mission_id INT,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (mission_id) REFERENCES missions(id)
)`);
