const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "hotmail", // Use your email service (e.g., 'hotmail' or 'outlook')
  auth: {
    user: "masoomasafar_2010@hotmail.com", // Your email
    pass: "sn5125a1", // Your password
  }, // Add this line for secure connection (if required)
});

app.use(express.json()); // Parse JSON bodies

app.post("/send-email", (req, res) => {
  const { name, email, number, message } = req.body;

  // Email data
  const mailOptions = {
    from: "masoomasafar_2010@hotmail.com",
    to: "safarabbas_2010@hotmail.com",
    subject: "Business Email!",
    html: `<p><strong>Hi my name is ${name}</strong></p><p><strong>${message}</strong></p><p><strong>My number is ${number}</strong></p><p><strong>My email: ${email}</strong></p>`,
  };
  

  // Send email
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

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
