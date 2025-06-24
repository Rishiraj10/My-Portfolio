import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const EducationAdmin = () => {
  const [education, setEducation] = useState<any>({ formal: [], certifications: [] });
  const [formData, setFormData] = useState({
    type: 'formal',
    title: '',
    institution: '',
    period: '',
    description: '',
    details: '',
    category: 'formal',
    certificateUrl: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const educationRef = collection(db, 'education');
    const unsubscribe = onSnapshot(educationRef, (querySnapshot) => {
      const educationData: any = { formal: [], certifications: [] };
      
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.type === 'formal') {
          educationData.formal.push({ id: doc.id, ...data });
        } else {
          educationData.certifications.push({ id: doc.id, ...data });
        }
      });
      
      setEducation(educationData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const eduData = {
      type: formData.type,
      title: formData.title,
      institution: formData.institution,
      period: formData.period,
      description: formData.description,
      details: formData.details.split('\n'),
      ...(formData.type === 'certification' && { 
        certificateUrl: formData.certificateUrl 
      })
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'education', editingId), eduData);
      } else {
        await addDoc(collection(db, 'education'), eduData);
      }
      
      setFormData({
        type: 'formal',
        title: '',
        institution: '',
        period: '',
        description: '',
        details: '',
        category: 'formal',
        certificateUrl: ''
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving education: ", error);
    }
  };

  const handleEdit = (edu: any) => {
    setFormData({
      type: edu.type,
      title: edu.title,
      institution: edu.institution,
      period: edu.period,
      description: edu.description,
      details: edu.details.join('\n'),
      category: edu.type,
      certificateUrl: edu.certificateUrl || ''
    });
    setEditingId(edu.id);
  };

  const handleDelete = async (id: string, type: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, 'education', id));
      } catch (error) {
        console.error("Error deleting education: ", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Manage Education</h2>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          {editingId ? 'Edit Education' : 'Add New Education'}
        </h3>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="formal">Formal Education</option>
            <option value="certification">Certification</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Institution</label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({...formData, institution: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Period</label>
          <input
            type="text"
            value={formData.period}
            onChange={(e) => setFormData({...formData, period: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., 2021-2025"
            
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="Short description"
            
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Details (one per line)</label>
          <textarea
            value={formData.details}
            onChange={(e) => setFormData({...formData, details: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            rows={4}
            placeholder="Enter each detail on a new line"
          />
        </div>

        {formData.type === 'certification' && (
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Certificate URL</label>
            <input
              type="url"
              value={formData.certificateUrl}
              onChange={(e) => setFormData({...formData, certificateUrl: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://example.com/certificate.pdf"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Paste a direct link to the PDF certificate
            </p>
          </div>
        )}
        
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          {editingId ? 'Update Education' : 'Add Education'}
        </button>
      </form>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Formal Education</h3>
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <p className="text-gray-500 dark:text-gray-400 text-center">Loading...</p>
            </div>
          ) : education.formal?.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <p className="text-gray-500 dark:text-gray-400 text-center">No formal education entries</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="divide-y dark:divide-gray-700">
                {education.formal?.map((item: any) => (
                  <div key={item.id} className="p-4 flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.institution} • {item.period}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id, 'formal')}
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
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Certifications</h3>
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <p className="text-gray-500 dark:text-gray-400 text-center">Loading...</p>
            </div>
          ) : education.certifications?.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <p className="text-gray-500 dark:text-gray-400 text-center">No certification entries</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="divide-y dark:divide-gray-700">
                {education.certifications?.map((item: any) => (
                  <div key={item.id} className="p-4 flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.institution} • {item.period}</p>
                      {item.certificateUrl && (
                        <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                          PDF certificate available
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id, 'certification')}
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

export default EducationAdmin;