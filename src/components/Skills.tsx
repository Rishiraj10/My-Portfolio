import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface Skill {
  id: string;
  type: string;
  name: string;
  level?: number;
}

export default function Skills() {
  const [skills, setSkills] = useState<{ technical: Skill[]; soft: Skill[] }>({ 
    technical: [], 
    soft: [] 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const skillsRef = collection(db, 'skills');
    const unsubscribe = onSnapshot(skillsRef, (querySnapshot) => {
      const technical: Skill[] = [];
      const soft: Skill[] = [];
      
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.type === 'technical') {
          technical.push({ id: doc.id, ...data } as Skill);
        } else {
          soft.push({ id: doc.id, ...data } as Skill);
        }
      });
      
      setSkills({ technical, soft });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white animate-slide-down">
          Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-slide-in-right">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Technical Skills</h3>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="flex justify-between mb-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10"></div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-gray-300 dark:bg-gray-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {skills.technical.map((skill, index) => (
                  <div key={skill.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '200ms' }}>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Soft Skills</h3>
            {loading ? (
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg h-10 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {skills.soft.map((skill, index) => (
                  <div
                    key={skill.id}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:scale-105 transform transition-all duration-300 animate-fade-in"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}