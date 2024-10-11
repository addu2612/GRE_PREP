import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, HelpCircle, Zap } from 'lucide-react';

const FancyHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-10 animate-float"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
        <h1 className="text-6xl md:text-8xl font-extrabold mb-8 text-center animate-fadeIn">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            GRE Vocabulary
          </span>
          <br />
          <span className="text-white">Trainer</span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-center max-w-2xl animate-fadeIn animation-delay-300">
          Elevate your vocabulary to new heights with our cutting-edge learning tools.
        </p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 animate-fadeIn animation-delay-600">
          <button
            onClick={() => navigate('/flashcards')}
            className="group relative px-8 py-4 bg-white text-blue-600 rounded-full shadow-lg font-bold text-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <span className="flex items-center justify-center">
              <BookOpen className="w-6 h-6 mr-2" />
              Flashcards
            </span>
            <span className="absolute inset-0 w-full h-full bg-blue-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"></span>
          </button>
          <button
            onClick={() => navigate('/quiz')}
            className="group relative px-8 py-4 bg-white text-pink-600 rounded-full shadow-lg font-bold text-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <span className="flex items-center justify-center">
              <HelpCircle className="w-6 h-6 mr-2" />
              Quiz
            </span>
            <span className="absolute inset-0 w-full h-full bg-pink-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"></span>
          </button>
        </div>

        <div className="mt-16 animate-fadeIn animation-delay-900">
          <h2 className="text-2xl font-bold mb-4 text-center">Why Choose Us?</h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            {[
              { icon: Zap, title: "Fast Learning", description: "Efficient techniques to boost your vocabulary quickly" },
              { icon: BookOpen, title: "Comprehensive", description: "Cover all essential GRE words and their usage" },
              { icon: HelpCircle, title: "Interactive", description: "Engaging quizzes and flashcards for better retention" },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm transition-transform transform hover:scale-105">
                <feature.icon className="w-12 h-12 mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FancyHomePage;