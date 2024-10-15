import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const SentenceEvaluation = () => {
  const [word, setWord] = useState('');
  const [sentence, setSentence] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEvaluation(null);
  }, [word, sentence]);

  const evaluateSentence = async () => {
    setIsLoading(true);
    setEvaluation(null);
    try {
      const response = await fetch('http://localhost:3004/api/evaluate-sentence', {
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
    <div className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-pink-500 font-semibold mb-1">Language Tool</div>
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">Sentence Evaluation</h2>
            <p className="mt-2 text-gray-500">Analyze your sentences for grammatical correctness and proper word usage.</p>
            <div className="mt-4 space-y-4">
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
                  autoComplete="off"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-pink-300 rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
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
                  autoComplete="off"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-pink-300 rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                />
              </div>
            </div>
            <button
              onClick={evaluateSentence}
              disabled={isLoading || !word || !sentence}
              className="mt-6 w-full bg-pink-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-pink-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Evaluating...' : 'Evaluate Sentence'}
            </button>
            {evaluation && (
              <div className="mt-6 bg-pink-50 border-l-4 border-pink-400 p-4">
                <h3 className="text-lg font-semibold text-pink-800">Evaluation Results:</h3>
                {evaluation.error ? (
                  <p className="mt-2 text-red-600">{evaluation.error}</p>
                ) : (
                  <>
                    <p className="mt-2 text-pink-700">Score: {evaluation.score}/10</p>
                    <p className="mt-2 flex items-center">
                      <span className="text-pink-700 mr-2">Grammatically Correct:</span>
                      {evaluation.isGrammaticallyCorrect ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <AlertCircle className="text-red-500" size={20} />
                      )}
                    </p>
                    <p className="mt-2 flex items-center">
                      <span className="text-pink-700 mr-2">Correct Usage:</span>
                      {evaluation.isUsageCorrect ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <AlertCircle className="text-red-500" size={20} />
                      )}
                    </p>
                    <p className="mt-2 text-pink-700">Feedback: {evaluation.feedback}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceEvaluation;