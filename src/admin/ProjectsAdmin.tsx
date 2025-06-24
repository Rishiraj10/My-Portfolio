import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '',
    github: '',
    demo: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectsRef = collection(db, 'projects');
    const unsubscribe = onSnapshot(projectsRef, (querySnapshot) => {
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      tech: formData.tech.split(',').map((t: string) => t.trim())
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), projectData);
      } else {
        await addDoc(collection(db, 'projects'), projectData);
      }
      
      setFormData({ title: '', description: '', tech: '', github: '', demo: '' });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving project: ", error);
    }
  };

  const handleEdit = (project: any) => {
    setFormData({
      title: project.title,
      description: project.description,
      tech: project.tech.join(', '),
      github: project.github,
      demo: project.demo
    });
    setEditingId(project.id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
      } catch (error) {
        console.error("Error deleting project: ", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Manage Projects</h2>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          {editingId ? 'Edit Project' : 'Add New Project'}
        </h3>
        
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
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Technologies (comma separated)</label>
            <input
              type="text"
              value={formData.tech}
              onChange={(e) => setFormData({...formData, tech: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            rows={3}
            
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData({...formData, github: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Demo URL</label>
            <input
              type="url"
              value={formData.demo}
              onChange={(e) => setFormData({...formData, demo: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          {editingId ? 'Update Project' : 'Add Project'}
        </button>
      </form>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <h3 className="text-xl font-semibold p-4 border-b dark:border-gray-700 text-gray-800 dark:text-white">
          Existing Projects
        </h3>
        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No projects yet</div>
        ) : (
          <div className="divide-y dark:divide-gray-700">
            {projects.map(project => (
              <div key={project.id} className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">{project.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(project)}
                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsAdmin;