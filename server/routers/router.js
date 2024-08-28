const express = require("express");
const router = express.Router(); 
const {  loginFunc,
    registerFunc,
    changePasswordFunc,
    deleteAccountFunc,
    signOutFunc } = require("../controllers/cont");

router.post("/signin", loginFunc);
router.post("/create-account", registerFunc);
router.post("/change-password", changePasswordFunc);
router.post("/signout", signOutFunc);
router.post("/delete-account", deleteAccountFunc);

module.exports = router; 
