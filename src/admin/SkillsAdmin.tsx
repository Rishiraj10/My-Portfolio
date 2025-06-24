import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const SkillsAdmin = () => {
  const [skills, setSkills] = useState<any>({ 
    technical: [], 
    soft: [] 
  });
  const [formData, setFormData] = useState({
    type: 'technical',
    name: '',
    level: '',
    category: 'technical'
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const skillsRef = collection(db, 'skills');
    const unsubscribe = onSnapshot(skillsRef, (querySnapshot) => {
      const skillsData: any = { technical: [], soft: [] };
      
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.type === 'technical') {
          skillsData.technical.push({ id: doc.id, ...data });
        } else {
          skillsData.soft.push({ id: doc.id, ...data });
        }
      });
      
      setSkills(skillsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const skillData = {
      type: formData.type,
      name: formData.name,
      ...(formData.type === 'technical' ? { level: parseInt(formData.level) } : {})
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'skills', editingId), skillData);
      } else {
        await addDoc(collection(db, 'skills'), skillData);
      }
      
      setFormData({ type: 'technical', name: '', level: '', category: 'technical' });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving skill: ", error);
    }
  };

  const handleEdit = (skill: any) => {
    setFormData({
      type: skill.type,
      name: skill.name,
      level: skill.level?.toString() || '',
      category: skill.type
    });
    setEditingId(skill.id);
  };

  const handleDelete = async (id: string, type: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteDoc(doc(db, 'skills', id));
      } catch (error) {
        console.error("Error deleting skill: ", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Manage Skills</h2>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          {editingId ? 'Edit Skill' : 'Add New Skill'}
        </h3>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Skill Type</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, type: e.target.value, category: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="technical">Technical Skill</option>
            <option value="soft">Soft Skill</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Skill Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            
          />
        </div>
        
        {formData.category === 'technical' && (
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Skill Level (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.level}
              onChange={(e) => setFormData({...formData, level: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              
            />
          </div>
        )}
        
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          {editingId ? 'Update Skill' : 'Add Skill'}
        </button>
      </form>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Technical Skills</h3>
          {loading ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-gray-500 dark:text-gray-400 text-center">Loading...</p>
            </div>
          ) : skills.technical?.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-gray-500 dark:text-gray-400 text-center">No technical skills</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="divide-y dark:divide-gray-700">
                {(skills.technical || []).map((skill: any) => (
                  <div key={skill.id} className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">{skill.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Level: {skill.level}%</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(skill)}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(skill.id, 'technical')}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Soft Skills</h3>
          {loading ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-gray-500 dark:text-gray-400 text-center">Loading...</p>
            </div>
          ) : skills.soft?.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-gray-500 dark:text-gray-400 text-center">No soft skills</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="divide-y dark:divide-gray-700">
                {(skills.soft || []).map((skill: any) => (
                  <div key={skill.id} className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">{skill.name}</h4>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(skill)}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(skill.id, 'soft')}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsAdmin;