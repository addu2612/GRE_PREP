// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Home, Menu, BookOpen, HelpCircle } from 'lucide-react';
import FlashcardApp from './FlashcardApp';
import QuizApp from './QuizApp';

const Sidebar = () => {
  return (
    <div className="bg-blue-600 text-white h-screen w-16 flex flex-col items-center py-4">
      <Link to="/" className="mb-8">
        <Home className="w-8 h-8" />
      </Link>
      <Link to="/flashcards" className="mb-8">
        <BookOpen className="w-8 h-8" />
      </Link>
      <Link to="/quiz" className="mb-8">
        <HelpCircle className="w-8 h-8" />
      </Link>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Welcome to GRE Vocabulary Trainer</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/flashcards')}
          className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md font-semibold"
        >
          Flashcards
        </button>
        <button
          onClick={() => navigate('/quiz')}
          className="px-6 py-3 bg-pink-500 text-white rounded-full shadow-md font-semibold"
        >
          Quiz
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gradient-to-b from-blue-100 to-pink-100 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flashcards" element={<FlashcardApp />} />
            <Route path="/quiz" element={<QuizApp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;