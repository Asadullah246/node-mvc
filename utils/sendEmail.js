const sendEmailWithGmail = require("../config/email");
const ThanksEmailTemp = require("../views/ThanksEmailTemplate");
const VerifyEmailTemp = require("../views/VerifyEmailTemp");

/* send thanks email for register */
const sendThanksEmail = async (email, otp) => {
  const message = {
    to: email,
    subject: "ধন্যবাদ আপনার রেজিস্ট্রেশনের জন্য",
    html: `${ThanksEmailTemp(email, otp)}`,
  };
  await sendEmailWithGmail(message);
};

/* send email to reset password */
const sendResetPasswordEmail = async (token, email) => {
  const url = `${process.env.SERVER_BASE_URL}/api/users/verify-token/${token}`;
  const message = {
    from: process.env.DEFAULT_EMAIL,
    to: email,
    subject: "আপনার পাসওয়ার্ড রিসেট করুন",
    html: `${VerifyEmailTemp(email, url)}`,
  };
  await sendEmailWithGmail(message);
};

/* send email to verify account */
const sendVerificationEmail = async (token, email) => {
  const message = {
    from: process.env.DEFAULT_EMAIL,
    to: email,
    subject: "Verify Your Account",
    html: `
            <h1>Verify Your Account</h1>
            <p>Please click the link below to verify your account.</p>
            <a href="${process.env.SERVER_BASE_URL}/verify-account/${token}">Verify Account</a>
            `,
  };
  await sendEmailWithGmail(message);
};

/* exports */
module.exports = {
  sendThanksEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
