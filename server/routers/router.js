const express = require("express");
const router = express.Router(); 
const { loginFunc,registerFunc } = require("../controllers/cont");

router.get("/login", loginFunc);
router.get("/register", registerFunc);

module.exports = router; 
