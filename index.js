const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());
app.use(express.json());

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: "masoomasafar_2010@hotmail.com", // Your email
    pass: "sn5125a1", // Your password or app-specific password
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false,
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, number, message } = req.body;

  const mailOptions = {
    from: "masoomasafar_2010@hotmail.com",
    to: "safarabbas_2010@hotmail.com",
    subject: "Business Email!",
    html: `<p><strong>Hi my name is ${name}</strong></p><p><strong>${message}</strong></p><p><strong>My number is ${number}</strong></p><p><strong>My email: ${email}</strong></p>`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
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
