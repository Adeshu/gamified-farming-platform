const express = require("express");
const router = express.Router();
const missionController = require("../controllers/missionController");

router.get("/", missionController.getMissions);
router.post("/complete", missionController.completeMission);

module.exports = router;
