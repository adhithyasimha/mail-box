const express = require('express');
const nodemailer = require('nodemailer');
const env = require('dotenv');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '/Users/adhithya/mailbox/backend/.env.resend' });

const app = express();
app.use(bodyParser.json({ limit: '50mb' })); // Increase payload size limit

// Add CORS headers to every response
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*'); // Allow requests from the React app's origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 465,
  secure: true,
  auth: {
    user: 'resend',
    pass: process.env.KEY,
  },
});

app.post('/api/send-email', (req, res) => {
  const { to, subject, text, fileName, fileContent } = req.body;

  const message = {
    from: 'adhithya@adhithya.tech',
    to,
    subject,
    text,
    attachments: [
      {
        filename: fileName,
        content: Buffer.from(fileContent, 'base64'),
      },
    ],
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log(`Email sent: ${info.response}`);
      res.send('Email sent successfully');
    }
  });
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
