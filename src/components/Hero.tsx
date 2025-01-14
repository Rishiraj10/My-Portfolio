import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center px-4 animate-slide-down">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
            Android Developer
          </span>
          <br />
          <span className="text-gray-800 dark:text-gray-100">& Game Devloper</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in">
          I'm Rishi Raj. Passionate about creating impactful mobile experiences
          and pursuing excellence in computer science.
        </p>
        <div className="flex justify-center space-x-4 animate-slide-up">
          <a
            href="#projects"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 hover:scale-105 transform transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 px-8 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:scale-105 transform transition-all duration-300"
          >
            Contact Me
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400 dark:text-gray-500" />
      </div>
    </div>
  );
}