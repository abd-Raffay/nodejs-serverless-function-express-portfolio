


const nodemailer = require("nodemailer");
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'https://personal-portfolio-nine-drab.vercel.app', // Specify your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allow OPTIONS method for preflight requests
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
}));

// Configure Nodemailer
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "rraffay38@gmail.com", 
    pass: "fkcb guhz nopz aoak"   // Replace with a secure method of storing sensitive information
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
  if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.setHeader('Access-Control-Allow-Origin', 'https://personal-portfolio-nine-drab.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).json({ status: "Message Sent", code: 200 });

    return;
  }

  if (req.method === 'POST') {
    // Handle POST request
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
      res.setHeader('Access-Control-Allow-Origin', 'https://personal-portfolio-nine-drab.vercel.app');
      res.status(200).json({ status: "Message Sent", code: 200 });
    } catch (error) {
      res.setHeader('Access-Control-Allow-Origin', 'https://personal-portfolio-nine-drab.vercel.app');
      res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

