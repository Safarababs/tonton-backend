const express = require("express");
const cors = require("cors");
require('dotenv').config()

const nodemailer = require("nodemailer");
const app = express();

app.use(cors());
app.use(express.json());

const appPassword = process.env.APP_PASSWORD;
const appHost = process.env.APP_HOST;
const appUser = process.env.APP_USER;
const appReciever = process.env.APP_RECIEVER;
const appPort = process.env.APP_PORT;


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: appHost,
  port: appPort,
  secure: true,
  auth: {
    user: appUser,
    pass: appPassword,
  },
  authMethod: 'PLAIN', // Specify the authentication method as PLAIN
});

app.post("/email", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: appUser,
    to: appReciever,
    subject: "Business Email!",
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hey welcome to your backend server of quiz");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
