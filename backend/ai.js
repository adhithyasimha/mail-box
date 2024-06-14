const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const ai = express();
require('dotenv').config({path: '/Users/adhithya/mailbox/backend/.env.ai'});

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

ai.post('/api/ai-prompt', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    res.json({ subject: text.subject, body: text.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

ai.listen(6969, () => {
  console.log('Server is running on port 6969');
});