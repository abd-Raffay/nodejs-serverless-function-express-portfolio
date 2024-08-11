const nodemailer = require("nodemailer");

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'https://personal-portfolio-nine-drab.vercel.app', // Specify your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
}));


// Configure Nodemailer
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "rraffay38@gmail.com", 
    pass: "fkcb guhz nopz aoak"  
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});







module.exports = async (req, res) => {


  if (req.method === 'POST') {
    const { firstName, lastName, email, message, phone } = req.body;
    const name = `${firstName} ${lastName}`;
    const mail = {
      from: name,
      to: "rraffay38@gmail.com",
      subject: "Contact Form Submission - Portfolio",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phone}</p>
             <p>Message: ${message}</p>`,
    };

    try {
      await contactEmail.sendMail(mail);
      res.status(200).json({ status: "Message Sent" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};


