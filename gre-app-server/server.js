const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

app.post('/api/evaluate-sentence', async (req, res) => {
  const { word, sentence } = req.body;

  if (!word || !sentence) {
    return res.status(400).json({ error: 'Word and sentence are required' });
  }

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const prompt = `Evaluate the following sentence using the word "${word}": "${sentence}"

    Provide a score out of 10, determine if it's grammatically correct,
    if the word usage is correct, and give brief feedback.

    Response format:
    Score: [0-10]
    Grammatically Correct: [Yes/No]
    Usage Correct: [Yes/No]
    Feedback: [Your feedback here]`;

    const result = await chatSession.sendMessage(prompt);
    const evaluation = parseGeminiResponse(result.response.text());
    res.json(evaluation);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to evaluate sentence' });
  }
});

function parseGeminiResponse(response) {
  const lines = response.split('\n');
  return {
    score: parseInt(lines[0].split(':')[1].trim()),
    isGrammaticallyCorrect: lines[1].includes('Yes'),
    isUsageCorrect: lines[2].includes('Yes'),
    feedback: lines[3].split(':')[1].trim(),
  };
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});