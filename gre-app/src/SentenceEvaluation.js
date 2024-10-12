import React, { useState } from 'react';
import { Button, Input, Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Sentence Evaluation</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="word" className="block text-sm font-medium text-gray-700">
              Word
            </label>
            <Input
              id="word"
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter a word"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="sentence" className="block text-sm font-medium text-gray-700">
              Sentence
            </label>
            <Input
              id="sentence"
              type="text"
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              placeholder="Enter a sentence using the word"
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={evaluateSentence} disabled={isLoading || !word || !sentence}>
          {isLoading ? 'Evaluating...' : 'Evaluate Sentence'}
        </Button>
      </CardFooter>
      {evaluation && (
        <CardContent>
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
        </CardContent>
      )}
    </Card>
  );
};

export default SentenceEvaluation;