CREATE DATABASE IF NOT EXISTS farming_db;
USE farming_db;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100)
);

-- Missions table
CREATE TABLE missions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200),
    description TEXT,
    points INT
);

-- Progress table
CREATE TABLE progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    mission_id INT,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    score INT DEFAULT 0,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (mission_id) REFERENCES missions(id)
);

-- Insert sample data
INSERT INTO users (name, email) VALUES 
('Farmer A', 'farmerA@mail.com'),
('Farmer B', 'farmerB@mail.com');

INSERT INTO missions (title, description, points) VALUES 
('Use Organic Fertilizer', 'Switch to natural fertilizers for crops.', 50),
('Water Efficiently', 'Adopt drip irrigation to save water.', 30);

INSERT INTO progress (user_id, mission_id, status) VALUES 
(1, 1, 'pending'),
(1, 2, 'pending'),
(2, 1, 'pending');
