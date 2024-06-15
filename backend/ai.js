const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const bodyParser = require('body-parser');

require('dotenv').config();

const apiKey = 'AIzaSyCNizXOsfX-wmNgQHQGV74DVck0ve3oaQc';
const genAI = new GoogleGenerativeAI(apiKey);

const app = express();
app.use(bodyParser.json());

app.post('/api/generate', async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(req.body.prompt);
  const response = await result.response;
  const text = response.text();
  res.json({ text });
});

app.listen(4000, () => console.log('Server running on port 3000'));