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

    console.log("Sending prompt to Gemini API:", prompt);

    const result = await chatSession.sendMessage(prompt);
    console.log("Raw API response:", result);

    if (!result || !result.response || !result.response.text) {
      throw new Error("Empty or invalid response from Gemini API");
    }

    const rawResponse = result.response.text();
    console.log("Raw response text:", rawResponse);

    const evaluation = parseGeminiResponse(rawResponse);
    res.json(evaluation);
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ error: 'Failed to evaluate sentence. Please try again.' });
  }
});

function parseGeminiResponse(response) {
  if (!response || typeof response !== 'string') {
    throw new Error("Invalid response format from Gemini API");
  }

  const lines = response.trim().split('\n');
  
  if (lines.length < 4) {
    throw new Error("Unexpected response format from Gemini API");
  }

  return {
    score: parseInt(lines[0].split(':')[1].trim()) || 0,
    isGrammaticallyCorrect: lines[1].toLowerCase().includes('yes'),
    isUsageCorrect: lines[2].toLowerCase().includes('yes'),
    feedback: lines[3].split(':').slice(1).join(':').trim() || "No feedback provided",
  };
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});