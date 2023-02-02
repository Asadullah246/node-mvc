const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/GenerateToken");
const {
  sendResetPasswordEmail,
  sendThanksEmail,
} = require("../utils/sendEmail");
const { uploadImage } = require("../utils/cloudinary");
const { sendRegistrationOTP } = require("../utils/sendSMS");

/* Register User */
const register = async (req, res) => {
  const { name, email, password, millName, millAddress, phone } = JSON.parse(
    req.body?.details
  );

  // Simple validation
  if (!name || !email || !phone || !password || !millName || !millAddress) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user)
      throw Error("আপনার এই নাম্বার বা ইমেইল দিয়ে আগে রেজিস্ট্রেশন করা হয়েছে");
    // Create salt & hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const uploadLogo = await uploadImage(req.file.path, "mills-logo");
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      millName,
      millAddress,
      millLogo: {
        url: uploadLogo.url,
        public_id: uploadLogo.public_id,
      },
    });
    /* generate otp code for 4 chars */
    const otp = Math.floor(1000 + Math.random() * 9000);
    /* expire time for 10 mins */
    const expireTime = Date.now() + 600000;
    newUser.otpCode = otp;
    newUser.otpExpire = expireTime;
    await newUser.save();

    await sendRegistrationOTP(phone, otp);
    await sendThanksEmail(email, otp);
    const token = generateToken(newUser);
    const { password: newPwd, _v, ...others } = newUser.toObject();

    res.status(202).send({
      success: true,
      message: "Register successfully done.",
      user: {
        token,
        details: others,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

/* verify otp code for registration */
const verifyOTPCode = async (req, res) => {
  const { otpCode } = req.body;
  
  try {
    const user = await User.findOne({
      otpCode,
      otpExpire: { $gt: Date.now() },
    });
   
    if (!user) {
      throw Error("OTP code is invalid or expired");
    }
    user.otpCode = null;
    user.otpExpire = null;
    user.isVerified = true;
    await user.save();
    res.status(200).send({
      success: true,
      message: "OTP code verified successfully",
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

/* resend otp code */
const resendOTPCode = async (req, res) => {
  const userId = req.user._id || req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw Error("User not found");
      return;
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expireTime = Date.now() + 600000;
    user.otpCode = otp;
    user.otpExpire = expireTime;
    await user.save();
    await sendRegistrationOTP(user?.phone, otp);
    res.status(200).send({
      success: true,
      message: "OTP code sent successfully",
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

/* login user by credential */
const login = async (req, res) => {
  const { username, password } = req.body;  

  if (!username || !password) {
    return res.status(404).send({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({
      $or: [
        {
          email: username,
        },
        {
          phone: username,
        },
      ],
    });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: `${username} is not register yet.`,
      });
    }
    const isMatchPassword = await bcrypt.compare(password, user?.password);
    if (!isMatchPassword) {
      return res.status(404).send({
        success: false,
        message: `আপনার কোথাও ভূল হচ্ছে আমাদের কাছে কোন সমস্যা নেই আপনার পাসওয়ার্ড টি আবার চেক করুন`,
      });
    }
    const { password: newPwd, _v, ...others } = user.toObject();
    const token = generateToken(user);
    res.status(202).send({
      success: true,
      message: "LoggedIn successfully done",
      user: {
        token,
        details: others,
      },
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: "Internal Server Error" + err,
    });
  }
};

/* send verification email link for reset password */
const sendEmailForResetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.send({
      msg: "Email is required",
    });

  const user = await User.findOne({ email });

  if (!user) {
    return res.send({
      success: false,
      message: `${email} doesn't exist`,
    });
  }

  const token = generateToken(user);
  /* expire time for 1 hr */
  const expireTime = new Date(Date.now() + 3600000);
  user.verificationToken = token;
  user.verificationTokenExpires = expireTime;
  await user.save();
  await sendResetPasswordEmail(token, email);

  res.send({
    success: true,
    message: `Email sent to ${email}`,
  });
};

/* verify token for reset password */
const verifyTokenForResetPassword = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.send({
      success: false,
      message: "Invalid or expired token",
    });
  }

  res.redirect(`${process.env.CLIENT_BASE_URL}/change-password/${user?._id}`);
};

/* change password via ID */
const changePasswordViaID = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(404).send({
      success: false,
      message: "Not found user id",
    });
  }
  const { password } = req.body;

  if (!password)
    return res.send({
      success: false,
      message: "all fields are required",
    });

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(202).send({
      success: true,
      message: "successfully changed password",
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: `Internal Server Error` + err,
    });
  }
};

/* change password via old password*/
const changePassword = async (req, res) => {
  const { oldPassword, password } = req.body;
  const userId = req.user._id;

  if (!oldPassword || !password) {
    return res.send({
      success: false,
      message: "All fields are required",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.send({
      success: false,
      message: "Unauthorized user",
    });
  }

  const isMatchOldPassword = await bcrypt.compare(oldPassword, user?.password);
  if (!isMatchOldPassword) {
    return res.status(404).send({
      success: false,
      message: "Old password is wrong",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;
  await user.save();
  res.status(202).send({
    success: false,
    message: "successfully changed password",
  });
};

/* get user profile */
const getCurrentUser = async (req, res) => {
  const userId = req.user._id || req.user.id;

  try {
    const user = await User.findById(userId).select("-password -__v");
    res.status(200).send({
      success: true,
      message: "User profile",
      user,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: `Internal Server Error` + err,
    });
  }
};

// exports
module.exports = {
  register,
  verifyOTPCode,
  login,
  sendEmailForResetPassword,
  verifyTokenForResetPassword,
  changePasswordViaID,
  changePassword,
  getCurrentUser,
  resendOTPCode,
};
