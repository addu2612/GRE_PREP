import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const SentenceEvaluation = () => {
  const [word, setWord] = useState('');
  const [sentence, setSentence] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const evaluateSentence = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/evaluate-sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, sentence }),
      });
      if (!response.ok) {
        throw new Error('Server responded with an error');
      }
      const data = await response.json();
      setEvaluation(data);
    } catch (error) {
      console.error('Error evaluating sentence:', error);
      setEvaluation({ error: 'Failed to evaluate sentence. Please try again.' });
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Sentence Evaluation</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="word" className="block text-sm font-medium text-gray-700">
            Word
          </label>
          <input
            id="word"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word"
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="sentence" className="block text-sm font-medium text-gray-700">
            Sentence
          </label>
          <input
            id="sentence"
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="Enter a sentence using the word"
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
      </div>
      <button
        onClick={evaluateSentence}
        disabled={isLoading || !word || !sentence}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        {isLoading ? 'Evaluating...' : 'Evaluate Sentence'}
      </button>
      {evaluation && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Evaluation Results:</h3>
          <p className="mt-2">Score: {evaluation.score}/10</p>
          <p className="mt-2">
            Grammatically Correct:{' '}
            {evaluation.isGrammaticallyCorrect ? (
              <CheckCircle className="inline text-green-500" />
            ) : (
              <AlertCircle className="inline text-red-500" />
            )}
          </p>
          <p className="mt-2">
            Correct Usage:{' '}
            {evaluation.isUsageCorrect ? (
              <CheckCircle className="inline text-green-500" />
            ) : (
              <AlertCircle className="inline text-red-500" />
            )}
          </p>
          <p className="mt-2">Feedback: {evaluation.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default SentenceEvaluation;