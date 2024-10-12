import React, { useState, useEffect } from 'react';
import { Book, RefreshCw } from 'lucide-react';

const DailyWordChallenge = () => {
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDailyWord = async () => {
    setLoading(true);
    // In a real application, this would be an API call to your backend
    // For this example, we'll use a mock data
    const mockData = {
      word: "Ephemeral",
      definition: "Lasting for a very short time",
      examples: [
        "The ephemeral nature of fashion trends makes it hard to keep up.",
        "Her fame was ephemeral; she was forgotten as quickly as she had become famous."
      ],
      synonyms: ["Transient", "Fleeting", "Momentary", "Short-lived"]
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setWordData(mockData);
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
            ) : wordData ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-purple-700 mb-2">{wordData.word}</h2>
                  <p className="text-gray-600">{wordData.definition}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-purple-600 mb-2">Examples:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {wordData.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
                
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
              </div>
            ) : (
              <p className="text-red-500">Failed to load word data. Please try again.</p>
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

export default DailyWordChallenge;