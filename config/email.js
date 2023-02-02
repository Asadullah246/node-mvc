const { google } = require("googleapis");
const nodeMailer = require("nodemailer");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.EMAIL_CLIENT_ID, // ClientID
  process.env.EMAIL_SECRET_KEY, // Client Secret
  process.env.EMAIL_REDIRECT_URI // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.EMAIL_REFRESH_TOKEN,
});

const sendEmailWithGmail = async (message) => {
  const accessToken = oauth2Client.getAccessToken();
  const transport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.DEFAULT_EMAIL,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_SECRET_KEY,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: process.env.DEFAULT_EMAIL,
    to: message.to,
    subject: message.subject,
    html: message.html,
  };

  /* send mail */
  await transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmailWithGmail;
