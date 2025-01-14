import React from 'react';

export default function Education() {
  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Education & Certifications
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Formal Education</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-indigo-600 dark:text-indigo-400">B.Tech in Computer Science</h4>
                <p className="text-gray-600 dark:text-gray-400">MITM (2021-2025)</p>
                <ul className="mt-2 text-gray-600 dark:text-gray-400 list-disc list-inside">
                  <li>Top scorer in Programming Fundamentals</li>
                  <li>Active member of Coding Events</li>
                  <li>Worked with group at real-life projects</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Certifications</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-indigo-600 dark:text-indigo-400">Android Development with Kotlin</h4>
                <p className="text-gray-600 dark:text-gray-400">Denis Panjuta (Udemy) • 2025</p>
              </div>
              <div>
                <h4 className="font-medium text-indigo-600 dark:text-indigo-400">Learnig Game Development</h4>
                <p className="text-gray-600 dark:text-gray-400">Currently at Unity 6</p>
                <ul className="mt-2 text-gray-600 dark:text-gray-400 list-disc list-inside">
                  <li>Already made some of normal 2d games</li>
                  <li>Working on 3d game</li>
                  <li>Coming Soon...</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}