const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());
app.use(express.json());

// Removed the hardcoded password here for security reasons
const AppPassword = "cuxw kwhu tbpt fbza"; // Use environment variables

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "safarabbas73.sa@gmail.com",
    pass: AppPassword,
  },
  authMethod: 'PLAIN', // Specify the authentication method as PLAIN
});

app.post("/email", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: "safarabbas73.sa@gmail.com",
    to: "safarabbas_2010@hotmail.com",
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
