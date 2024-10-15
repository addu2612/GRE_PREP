import React, { useState } from 'react';

const WordOval = ({ word, color }) => (
  <div
    className={`inline-block m-1 px-3 py-1 rounded-full text-white ${color}`}
  >
    {word}
  </div>
);

const WordGroup = ({ title, words, color }) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2 text-gray-700">{title}:</h3>
    <div className="flex flex-wrap">
      {words.map((word, index) => (
        <WordOval key={index} word={word} color={color} />
      ))}
    </div>
  </div>
);

const CustomAlert = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
    <span className="block sm:inline">{message}</span>
  </div>
);

const WordSphere = () => {
  const [word, setWord] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:3004/api/wordsphere?word=${encodeURIComponent(word)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to fetch word relationships. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">WordSphere</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
          className="w-full px-3 py-2 border rounded-md mb-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Explore Word Relationships'}
        </button>
      </form>
      
      {error && <CustomAlert message={error} />}
      
      {results && (
        <div>
          <WordGroup title="Synonyms" words={results.synonyms} color="bg-teal-500" />
          <WordGroup title="Antonyms" words={results.antonyms} color="bg-rose-500" />
        </div>
      )}
    </div>
  );
};

export default WordSphere;