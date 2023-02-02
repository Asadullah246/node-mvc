const axios = require("axios");

const SERVER_URL = "http://localhost:5000";
const API_URL = `${SERVER_URL}/api`;

/* cloudinary config */
const cloudConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
};

/* send sms function */
const sendSMS = async (number, message) => {
  const { data } = await axios.post(
    process.env.SMS_SEND_URL +
      `&number=${number}&senderid=${process.env.SMS_SENDER_ID}&message=${message}`
  );
  if (data?.success) {
    return true;
  }
  return false;
};


module.exports = {
  SERVER_URL,
  API_URL,
  cloudConfig,
  sendSMS,
};
