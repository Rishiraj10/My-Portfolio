import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface EducationItem {
  id: string;
  type: string;
  title: string;
  institution: string;
  period: string;
  description: string;
  details: string[];
  certificateUrl?: string;
}

export default function Education() {
  const [formal, setFormal] = useState<EducationItem[]>([]);
  const [certifications, setCertifications] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const educationRef = collection(db, 'education');
    const unsubscribe = onSnapshot(educationRef, (querySnapshot) => {
      const formalData: EducationItem[] = [];
      const certData: EducationItem[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const item = { id: doc.id, ...data } as EducationItem;
        if (item.type === 'formal') formalData.push(item);
        else if (item.type === 'certification') certData.push(item);
      });

      setFormal(formalData);
      setCertifications(certData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Education & Certifications
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Formal Education - Will only take the space it needs */}
          <div className="w-full lg:w-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Formal Education</h3>
            {loading ? (
              <div className="min-h-0">
                <div className="animate-pulse">
                  <div className="h-5 bg-indigo-200 dark:bg-indigo-900/30 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
                  <ul className="space-y-2">
                    <li className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></li>
                    <li className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></li>
                    <li className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="min-h-0">
                {formal.map((item, index) => (
                  <div 
                    key={item.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h4 className="font-medium text-indigo-600 dark:text-indigo-400 text-lg mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {item.institution} • {item.period}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                      {item.description}
                    </p>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                      {item.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-indigo-500 mr-2 mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Certifications - Separate container that grows independently */}
          <div className="w-full lg:flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Certifications</h3>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="animate-pulse border-l-4 border-indigo-200 dark:border-indigo-900/30 pl-4 py-2">
                    <div className="h-5 bg-indigo-200 dark:bg-indigo-900/30 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {certifications.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`border-l-4 border-indigo-200 dark:border-indigo-900/30 pl-4 py-2 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 animate-slide-up ${
                      item.certificateUrl ? 'cursor-pointer hover:translate-x-1 transform' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => item.certificateUrl && window.open(item.certificateUrl, '_blank')}
                  >
                    <h4 className={`font-medium text-sm mb-1 ${
                      item.certificateUrl 
                        ? 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {item.title}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">
                      {item.institution} • {item.period}
                    </p>
                    {item.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-xs mb-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    {item.details.length > 0 && (
                      <ul className="text-gray-500 dark:text-gray-400 text-xs space-y-0.5">
                        {item.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-indigo-400 mr-1 mt-0.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
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