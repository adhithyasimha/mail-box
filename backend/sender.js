const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

// CORS i.e cross origin resource sharing 
app.use(cors({ origin: 'http://localhost:3000' }));//change it when deplyoing in vercel

// CORS headers to every response
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');//change it when deplyoing in vercel
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Supabase 
const supabaseUrl = 'supabase-url';
const supabaseKey = 'supabasekey';
const supabase = createClient(supabaseUrl, supabaseKey);

// Email sending setup
const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 465,
  secure: true,
  auth: {
    user: 'resend',
    pass: 'resend-key', // add your resend key get it from resend.com
  },
});

app.post('/api/send-email', async (req, res) => {
  const { to, subject, text, fileName, fileContent } = req.body;

  const message = {
    from: 'adhithya@adhithya.tech'//replace it with your desired email
    ,
    to,
    subject,
    text,
    attachments: fileName && fileContent ? [{ filename: fileName, content: Buffer.from(fileContent, 'base64') }] : [],
  };

  try {
    // Send email
    await transporter.sendMail(message);
    console.log('Email sent successfully');

    // Get the current time
    const sentAt = new Date().toISOString();

    // Insert email data into Supabase database
    const { error } = await supabase
      .from('sentMails')
      .insert([{ 
        to_email: to, 
        from_email: 'adhithya@adhithya.tech'//replace it with your desired email
        , 
        subject, 
        message: text, 
        file_name: fileName || null, 
        file_content: fileContent || null, 
        sent_at: sentAt 
      }]);

    if (error) {
      console.error('Supabase insert error:', JSON.stringify(error, null, 2));
      res.status(200).send({ success: true, message: 'Email sent successfully, but failed to log in database', error: error });
    } else {
      console.log('Email inserted into database successfully');
      res.status(200).send({ success: true, message: 'Email sent and logged successfully' });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ success: false, error: 'Error sending email', details: error });
  }
});


// Fetch sent emails from Supabase
app.get('/api/supabase-sent', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('sentMails')
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


// ai generative feature
const apiKey = 'gemini-api-key';
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

    const result = await chatSession.sendMessage(`Write an email about "${input}" and return the subject and body as a json object. Only subject and body are needed, nothing else. The response should be a valid JSON object, with no backticks or additional text.`);

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
