// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Home, Menu, BookOpen, HelpCircle } from 'lucide-react';
import FlashcardApp from './FlashcardApp';
import QuizApp from './QuizApp';
import FancyHomePage from './FancyHomePage';

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


function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<FancyHomePage />} />
            <Route path="/flashcards" element={<FlashcardApp />} />
            <Route path="/quiz" element={<QuizApp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;