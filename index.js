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
  const { name, email, number,company, message } = req.body;

  const defaultCompany = "Company Name not provided";
  const companyName = company || defaultCompany;

  const htmlContent = `
  <p>Hello E. T. Enterprise,</p>
  <h1>Business Email</h1>
  <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">My name is ${name} <br><br>${message}</p>
  <p>Customer Contact Details</p>
  <p><strong>Customer Name:</strong> ${name}</p>
  <p><strong>Customer Company Name:</strong> ${company}</p>
  <p><strong>Customer Contact:</strong> <a href="tel:${number}">${number}</a></p>
  <p><strong>Customer Email:</strong> <a href="mailto:${email}">${email}</a></p>
`;

  const mailOptions = {
    from: appUser,
    to: appReciever,
    subject: "Business Email!",
    html: htmlContent,
  };
  
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
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
