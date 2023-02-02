const axios = require("axios");
const { sendSMS } = require("../config/config");

/* Send Registration SMS */
const sendRegistrationOTP = async (number, otp) => {
  const message = `আপনার ভেরিফিকেশন কোড ${otp} ।
  ১০ মিনিট পর কোডটি কাজ করবে না।
  ধন্যবাদ`;
  const isSend = await sendSMS(number, message);
  if (isSend) {
    return true;
  }
  return new Error("SMS send failed");
};

// exports
module.exports = {
  sendRegistrationOTP,
};
