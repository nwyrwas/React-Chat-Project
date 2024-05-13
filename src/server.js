// server.js
const express = require('express');
const OpenAI = require('openai');

const openai = new OpenAI('sk-proj-x7mG8cuFsLZaHXeCynmUT3BlbkFJexfamwoTRiGMTcsolY5o');

const app = express();
app.use(express.json());

app.post('/api/generateResponse', async (req, res) => {
  const prompt = req.body.prompt;
  const gptResponse = await openai.complete({
    engine: 'text-davinci-002',
    prompt: prompt,
    maxTokens: 60,
  });

  res.json({ response: gptResponse.data.choices[0].text.trim() });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
