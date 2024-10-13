const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get('/api/word-of-the-day', async (req, res) => {
  try {
    const prompt = `Generate a new, unique word of the day with its definition, examples, and synonyms. Word should be common for the GRE exam.
     Format the response as follows:
     Word: [word]
     Definition: [definition]
     Examples:
     - [example 1]
     - [example 2]
     Synonyms: [synonym1], [synonym2], [synonym3]`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log('Raw API Response:', text);

    // Parse the generated text into a structured object
    const lines = text.split('\n');
    const wordData = {
      word: lines[0].split(': ')[1].trim().replace(/\*/g, ''),
      definition: lines[1].split(': ')[1],
      examples: [
        lines[3].slice(2),
        lines[4].slice(2)
      ],
      synonyms: lines[5].split(': ')[1].split(', ')
    };

    res.json(wordData);
  } catch (error) {
    console.error('Error fetching word of the day:', error);
    res.status(500).json({ error: 'Failed to fetch word of the day' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});