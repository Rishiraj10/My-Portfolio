import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white animate-slide-down">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-slide-in-right">
            <img
              src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=800"
              alt="Developer working"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="animate-slide-up">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 hover:translate-x-2 transition-transform duration-300">
            I'm a passionate Android developer and Beginner Game Developer, currently focused on building mobile applications and exploring game development. My journey in technology started with a deep interest in Android development, and over time, I’ve expanded my skills to include game creation. I’m driven by the challenge of creating impactful and engaging applications that enhance user experiences and solve real-world problems.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 hover:translate-x-2 transition-transform duration-300">
              With a strong foundation in Android development using Kotlin and deep understanding of
              android development fundamentals, I aim to contribute to impactful projects that push the
              boundaries of mobile technology.
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:scale-105 transform transition-all duration-300">
                <h3 className="font-bold text-2xl text-indigo-600 dark:text-indigo-400">1.5+</h3>
                <p className="text-gray-600 dark:text-gray-400">Years Coding</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:scale-105 transform transition-all duration-300">
                <h3 className="font-bold text-2xl text-purple-600 dark:text-purple-400">4+</h3>
                <p className="text-gray-600 dark:text-gray-400">Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}