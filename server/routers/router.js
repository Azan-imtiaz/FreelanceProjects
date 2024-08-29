const express = require("express");
const router = express.Router(); 
const {  loginFunc,
    registerFunc,
    changePasswordFunc,
    deleteAccountFunc,
    signOutFunc,verifyOTPFunc } = require("../controllers/cont");

router.post("/signin", loginFunc);
router.post("/create-account", registerFunc);
router.put("/change-password", changePasswordFunc);
router.post("/signout", signOutFunc);
router.delete("/delete-account", deleteAccountFunc);
router.delete("/verifyOtp", verifyOTPFunc);

module.exports = router; 
