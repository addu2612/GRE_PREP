const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3004;

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

// Sentence Evaluation Endpoint
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

// WordSphere Endpoint
app.get('/api/wordsphere', async (req, res) => {
  const { word } = req.query;
  if (!word) {
    return res.status(400).json({ error: 'Word parameter is required' });
  }
  try {
    const prompt = `Provide synonyms and antonyms for the word "${word}".
     Format the response as follows:
     Synonyms: [synonym1], [synonym2], [synonym3]
     Antonyms: [antonym1], [antonym2], [antonym3]`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log('Raw API Response:', text); // Log the raw response for debugging
    const wordData = parseWordSphereResponse(text, word);
    res.json(wordData);
  } catch (error) {
    console.error('Error fetching word relationships:', error);
    res.status(500).json({ error: 'Failed to fetch word relationships' });
  }
});

function parseWordSphereResponse(text, originalWord) {
  const lines = text.split('\n').map(line => line.trim());
  let synonyms = [];
  let antonyms = [];
  lines.forEach(line => {
    if (line.toLowerCase().startsWith('synonyms:')) {
      synonyms = line.substring(9).split(',').map(word => word.trim()).filter(word => word);
    } else if (line.toLowerCase().startsWith('antonyms:')) {
      antonyms = line.substring(9).split(',').map(word => word.trim()).filter(word => word);
    }
  });
  return {
    word: originalWord,
    synonyms: synonyms.length > 0 ? synonyms : ['No synonyms found'],
    antonyms: antonyms.length > 0 ? antonyms : ['No antonyms found']
  };
}

// Word of the Day Endpoint
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