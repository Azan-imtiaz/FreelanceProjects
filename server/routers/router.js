const express = require("express");
const router = express.Router(); 
const {  loginFunc,
    registerFunc,
    changePasswordFunc,
    deleteAccountFunc,
    signOutFunc,verifyOTPFunc, forgetPaswordFunc ,resetPasword,verifyTokenAtStart} = require("../controllers/cont");

router.post("/signin", loginFunc);
router.post("/create-account", registerFunc);
router.put("/change-password", changePasswordFunc);
router.post("/signout", signOutFunc);
router.delete("/delete-account", deleteAccountFunc);
router.post("/verifyOtp", verifyOTPFunc);
router.post("/forgetPassword", forgetPaswordFunc);
router.post("/resetPasword", resetPasword);
router.post("/verifyTokenAtStart", verifyTokenAtStart);


module.exports = router; 
