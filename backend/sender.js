const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

// CORS middleware
app.use(cors({ origin: 'http://localhost:3000' }));

// CORS headers to every response
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Supabase setup
const supabaseUrl = 'https://djkrtmwwfohyonafoumv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa3J0bXd3Zm9oeW9uYWZvdW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1MTY5MjYsImV4cCI6MjAzNDA5MjkyNn0.coE-6KquwZi_KQlc893niek7iuSV-B7U46oNVGt3cp8';
const supabase = createClient(supabaseUrl, supabaseKey);

// Email sending setup
const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 465,
  secure: true,
  auth: {
    user: 'resend',
    pass: 're_RZfMjL6H_Q8KERcE4yYcPMhLzb5fCHt2c', // Replace with your actual password
  },
});

app.post('/api/send-email', async (req, res) => {
  const { to, subject, text, fileName, fileContent } = req.body;

  const message = {
    from: 'adhithya@adhithya.tech',
    to,
    subject,
    text,
    attachments: fileName && fileContent ? [{ filename: fileName, content: Buffer.from(fileContent, 'base64') }] : [],
  };

  try {
    await transporter.sendMail(message);

    // Get the current time
    const sentAt = new Date().toISOString();

    // Insert email data into Supabase database
    const { data, error } = await supabase
      .from('emails')
      .insert([{ to_email: to, from_email: 'adhithya@adhithya.tech', subject, message: text, file_name: fileName || null, file_content: fileContent || null, sent_at: sentAt }]);

    if (error) {
      console.error('Supabase insert error:', error);
      res.status(500).send({ error: 'Error inserting email into database', details: error });
    } else if (data && data.length > 0) {
      console.log('Email inserted into database with ID: ${data[0].id}');
      res.send('Email sent successfully');
    } else {
      console.error('No data returned from Supabase insert operation');
      res.status(500).send('Error inserting email into database');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ error: 'Error sending email', details: error });
  }
});


// Fetch sent emails from Supabase
app.get('/api/supabase-sent', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('emails')
      .select('*');

    if (error) {
      console.error('Supabase fetch error:', error);
      res.status(500).send('Error fetching emails from database');
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).send('Error fetching emails');
  }
});

//receiving route
// app.get('/api/receive-mail', async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from('receive_mail')
//       .select('*');

//     if (error) {
//       console.error('Supabase fetch error:', error);
//       res.status(500).send('Error fetching emails from database');
//     } else {
//       res.json(data);
//     }
//   } catch (error) {
//     console.error('Error fetching emails:', error);
//     res.status(500).send('Error fetching emails');
//   }
// });
// ai generative feature
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

    const result = await chatSession.sendMessage('Write an email about "${input}" and return the subject and body as a json object. Only subject and body are needed, nothing else. The response should be a valid JSON object, with no backticks or additional text.');

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

// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { createClient } = require('@supabase/supabase-js');
// const axios = require('axios');

// const app = express();
// app.use(bodyParser.json({ limit: '50mb' }));

// // CORS middleware
// app.use(cors({ origin: 'http://localhost:3000' }));

// // CORS headers to every response
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// // Supabase setup
// const supabaseUrl = 'https://djkrtmwwfohyonafoumv.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa3J0bXd3Zm9oeW9uYWZvdW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1MTY5MjYsImV4cCI6MjAzNDA5MjkyNn0.coE-6KquwZi_KQlc893niek7iuSV-B7U46oNVGt3cp8';
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Email sending setup
// const transporter = nodemailer.createTransport({
//   host: 'smtp.resend.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'resend',
//     pass: 're_RZfMjL6H_Q8KERcE4yYcPMhLzb5fCHt2c', // Replace with your actual password
//   },
// });

// // Endpoint to fetch and save emails from external server using Axios
// app.get('/api/fetchmail', async (req, res) => {
//   try {
//     const url = 'http://15.207.118.14:5000/api/mail';
//     const response = await axios.get(url);

//     if (!response.data) {
//       throw new Error('No emails found');
//     }

//     console.log('Fetched emails:', response.data); // Log fetched emails

//     const insertData = response.data.map(email => ({
//       to_email: email.to.text,
//       from_email: email.from.value[0].address,
//       subject: email.subject,
//       message: email.text || email.html,
//       file_name: email.attachments.length > 0 ? email.attachments[0].filename : null,
//       file_content: email.attachments.length > 0 ? Buffer.from(email.attachments[0].content, 'base64') : null,
//       sent_at: email.date || new Date().toISOString(),
//     }));

//     console.log('Inserting data into Supabase:', insertData); // Log insert data before insertion

//     const { data, error } = await supabase.from('receivemail').insert(insertData);

//     if (error) {
//       console.error('Supabase insert error:', error);
//       res.status(500).send({ error: 'Error inserting emails into database', details: error });
//     } else if (data && data.length > 0) {
//       console.log(`Inserted ${data.length} emails into Supabase`);
//       res.json({ success: true, count: data.length });
//     } else {
//       console.error('No data returned from Supabase insert operation');
//       res.status(500).send('Error inserting emails into database');
//     }
//   } catch (error) {
//     console.error('Error fetching and saving emails:', error);
//     res.status(500).send({ error: 'An error occurred while fetching and saving emails', details: error.message });
//   }
// });

// // Start the Express server
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

