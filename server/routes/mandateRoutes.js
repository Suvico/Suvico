
const express = require('express');
const router = express.Router();
const {
  saveMandate,
  getMandate
} = require("../controllers/mandateController");


// Save mandate (frontend sends encrypted sensitive fields + checksum)
router.post("/", saveMandate);

// Get stored mandate (for UI)
router.get("/:id", getMandate);


module.exports = router;
