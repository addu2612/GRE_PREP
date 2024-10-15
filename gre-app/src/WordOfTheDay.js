import React, { useState, useEffect } from 'react';
import { Book, RefreshCw } from 'lucide-react';

const WordOfTheDay = () => {
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDailyWord = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3004/api/word-of-the-day?t=${Date.now()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch word data');
      }
      const data = await response.json();
      if (!data.word || !data.definition || !Array.isArray(data.examples) || !Array.isArray(data.synonyms)) {
        throw new Error('Invalid data structure received from API');
      }
      setWordData(data);
    } catch (error) {
      console.error('Error fetching word data:', error);
      setError(error.message);
      setWordData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDailyWord();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-purple-800">Daily Word Challenge</h1>
              <button
                onClick={fetchDailyWord}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <RefreshCw className="mr-2" size={18} />
                New Word
              </button>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : wordData ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-purple-700 mb-2">{wordData.word}</h2>
                  <p className="text-gray-600">{wordData.definition}</p>
                </div>
                {wordData.examples && wordData.examples.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-purple-600 mb-2">Examples:</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      {wordData.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {wordData.synonyms && wordData.synonyms.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-purple-600 mb-2">Synonyms:</h3>
                    <div className="flex flex-wrap gap-2">
                      {wordData.synonyms.map((synonym, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {synonym}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-red-500">No word data available. Please try again.</p>
            )}
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Expand your vocabulary daily with our GRE word challenge!
          </p>
          <div className="mt-4 flex justify-center items-center text-purple-700">
            <Book className="mr-2" size={18} />
            <span>Learn a new word every day</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordOfTheDay;