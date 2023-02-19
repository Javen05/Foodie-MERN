const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const ID = process.env.CLIENT_ID;
const SECRET = process.env.CLIENT_SECRET;
const URL = process.env.REDIRECT_URL;
const TOKEN = process.env.REFRESH_TOKEN;

const oAuth2CLient = new google.auth.OAuth2(ID, SECRET, URL);
oAuth2CLient.setCredentials({ refresh_token: TOKEN });

async function sendMail(email, link) {
  let username = link.split("/")[4];
  try {
    const accessToken = await oAuth2CLient.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "foodiebyjaven@gmail.com",
        clientId: ID,
        clientSecret: SECRET,
        refreshToken: TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "foodiebyjaven@gmail.com",
      to: email,
      subject: `Foodie: Reset Password for ${username}`,
      html: `<h1>Link to Reset Password: </h1> <a href="${link}">Click here to reset your password</a> <br> <p>or Copy the link below: </p> <p>${link}</p> <br><br> <i>If you did not make this request to reset password for your account, it could mean that your phone number and email has been leaked. But do not worry, your Account will not be breached unless your Account or Email password is leaked.</i>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = { sendMail };
