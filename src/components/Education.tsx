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
        <div className="grid md:grid-cols-2 gap-8">
          {/* Formal Education */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Formal Education</h3>
            {loading ? (
              <div className="space-y-6">
                {[1, 2].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-5 bg-indigo-200 dark:bg-indigo-900/30 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
                    <ul className="mt-2 space-y-2">
                      <li className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></li>
                      <li className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></li>
                      <li className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></li>
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {formal.map((item) => (
                  <div key={item.id}>
                    <h4 className="font-medium text-indigo-600 dark:text-indigo-400">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.institution} ({item.period})
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                    <ul className="mt-2 text-gray-600 dark:text-gray-400 list-disc list-inside">
                      {item.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Certifications */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Certifications</h3>
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-5 bg-indigo-200 dark:bg-indigo-900/30 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
                    <ul className="mt-2 space-y-2">
                      <li className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></li>
                      <li className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></li>
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {certifications.map((item) => (
                  <div key={item.id}>
                    <h4 
                      className={`font-medium ${item.certificateUrl ? 
                        'text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 cursor-pointer' : 
                        'text-indigo-600 dark:text-indigo-400'}`}
                      onClick={() => item.certificateUrl && window.open(item.certificateUrl, '_blank')}
                    >
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.institution} • {item.period}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                    {item.details.length > 0 && (
                      <ul className="mt-2 text-gray-600 dark:text-gray-400 list-disc list-inside">
                        {item.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
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