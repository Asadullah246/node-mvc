const router = require("express").Router();

// Imports controllers
const userController = require("../controllers/user.controller");
const AuthGuard = require("../middlewares/AuthGuard");
const upload = require("../middlewares/multer");

/* Routes */

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", upload.single("millLogo"), userController.register);

// @route POST api/users/verify-otp
// @desc Verify OTP code for registration
// @access Public
router.post("/verify-otp", userController.verifyOTPCode);

// @route GET api/users/resend-otp
// @desc Resend OTP code for registration
// @access Public
router.get("/resend-code", AuthGuard, userController.resendOTPCode);



// @route POST api/users/login
// @desc Login User
// @access Public
router.post("/login", userController.login);

// @route POST api/users/send-reset-password
// @desc Send Email for reset password
// @access public
router.post("/send-reset-password", userController?.sendEmailForResetPassword);

// @route GET api/users/verify-token/:token
// @desc Verify token for reset password
// @access public
router.get("/verify-token/:token", userController?.verifyTokenForResetPassword);

// @route POST api/users/change-password/:userId
// @desc Change Password via
// @access secure
router.post("/change-password-id/:userId", userController?.changePasswordViaID);

// @route POST api/users/change-password/
// @desc Change Password via old password
// @access secure
router.post("/change-password", userController?.changePassword);

// @route GET api/users/me
// @desc Get current user
// @access secure
router.get("/me", AuthGuard,  userController?.getCurrentUser);

//exports
module.exports = router;
