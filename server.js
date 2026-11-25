require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "dev-only-session-secret",
  resave: false,
  saveUninitialized: true
}));

// Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, results) => {
      if(err) {
        return res.status(500).send(err);
      }
      if(results.length === 0) {
        return res.status(401).send("Invalid credentials");
      }
      req.session.user = results[0];
      res.send({ success: true });
    }
  );
});

// Register
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;
  db.query(
    "INSERT INTO users (username,email,password) VALUES (?,?,?)",
    [username, email, password],
    (err, results) => {
      if(err) {
        return res.status(500).send(err);
      }
      res.send({ success: true });
    }
  );
});

// Logout
app.get("/api/logout", (req,res)=>{
  req.session.destroy();
  res.send({success:true});
});

// Get all users
app.get("/api/users", (req,res)=>{
  db.query("SELECT * FROM users", (err, results)=>{
    if(err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

// Get all missions
app.get("/api/missions", (req,res)=>{
  db.query("SELECT * FROM missions", (err, results)=>{
    if(err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

// Get progress
app.get("/api/progress", (req,res)=>{
  db.query("SELECT * FROM progress", (err, results)=>{
    if(err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
