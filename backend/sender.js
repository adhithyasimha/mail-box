const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

// Add CORS middleware to allow requests from your React app running on port 3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Add CORS headers to every response
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Email sending setup
const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 465,
  secure: true,
  auth: {
    user: 'resend',
    pass: 'your-resend-password-here', // Replace with your actual password
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

// AI email generation setup
const apiKey = 'AIzaSyAThnU4c163VEY5yv6RtKZHnEaBMYdPTug';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

app.post('/api/ai', async (req, res) => {
  try {
    const input = req.body.prompt;
    console.log('Received input:', input);

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(`Write an email about "${input}" and return the subject and body as a json object . 
      only subject and body nothing else not 3 backtricks and json from start and end only "",=,{}are allowed and also /n is allowed `);




    // Ensure to await for the text() method correctly
    const responseText = await result.response.text();

    console.log('AI Response:', responseText);

    // Attempt to parse the response as JSON
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
      res.json({ success: true, data: parsedResponse });
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      res.status(500).json({ success: false, error: 'Error parsing AI response.' });
    }
  } catch (error) {
    console.error('Error generating email:', error);
    res.status(500).json({ success: false, error: 'An error occurred while generating the email.' });
  }
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
