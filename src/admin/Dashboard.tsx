import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    technicalSkills: 0,
    softSkills: 0,
    education: 0,
    certifications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch projects count
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        
        // Fetch skills
        const skillsSnapshot = await getDocs(collection(db, 'skills'));
        const technical = skillsSnapshot.docs.filter(doc => doc.data().type === 'technical');
        const soft = skillsSnapshot.docs.filter(doc => doc.data().type === 'soft');
        
        // Fetch education
        const educationSnapshot = await getDocs(collection(db, 'education'));
        const formal = educationSnapshot.docs.filter(doc => doc.data().type === 'formal');
        const certifications = educationSnapshot.docs.filter(doc => doc.data().type === 'certification');

        setStats({
          projects: projectsSnapshot.size,
          technicalSkills: technical.length,
          softSkills: soft.length,
          education: formal.length,
          certifications: certifications.length
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats: ", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const data = [
    { name: 'Projects', count: stats.projects },
    { name: 'Tech Skills', count: stats.technicalSkills },
    { name: 'Soft Skills', count: stats.softSkills },
    { name: 'Education', count: stats.education },
    { name: 'Certifications', count: stats.certifications },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Admin Dashboard</h2>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Projects</h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.projects}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Tech Skills</h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.technicalSkills}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Soft Skills</h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.softSkills}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Education</h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.education}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Certifications</h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.certifications}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Content Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h3>
          <ul className="space-y-3">
            <li>
              <a 
                href="/admin/projects" 
                className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                <span className="mr-2">+</span> Add New Project
              </a>
            </li>
            <li>
              <a 
                href="/admin/skills" 
                className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                <span className="mr-2">+</span> Add New Skill
              </a>
            </li>
            <li>
              <a 
                href="/admin/education" 
                className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                <span className="mr-2">+</span> Add Education/Certification
              </a>
            </li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h3>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400 italic">No recent activity yet. Changes will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;