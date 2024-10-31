import React from 'react';
import ChatBot from './components/ChatBot';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Import icons from react-icons

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center p-8 space-y-6">
      {/* Title/Header for clarity */}
      <h1 className="text-4xl font-semibold text-gray-100">Movie Recommendation Chatbot</h1>
      <p className="text-gray-400 text-xl">Ask me for movie suggestions by genre, mood, or even specific details!</p>

      {/* ChatBot Container */}
      <div className="max-w-6xl w-full p-8 bg-black rounded-2xl shadow-2xl shadow-black border border-gray-800">
        <ChatBot />
      </div>

      {/* Footer with links and icons */}
      <footer className="w-full max-w-6xl text-center mt-8 text-gray-400 text-sm space-y-2">
        <p>© {new Date().getFullYear()} All rights reserved. Developed by <b>Tendulkar Budida</b></p>
        <div className="flex justify-center gap-4">
          <a href="https://github.com/TendulkarBudida" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-gray-200 underline">
            <FaGithub className="text-lg" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/tendulkarbudida/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-gray-200 underline">
            <FaLinkedin className="text-lg" /> LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;