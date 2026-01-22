const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const { generateReports ,generateReportsCSV} = require("../controllers/reportController");

router.use(protect);
router.use(authorizeRoles("official"));

router.get("/", generateReports);
router.get("/export", generateReportsCSV);


module.exports = router;
