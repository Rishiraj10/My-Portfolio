import { Outlet, Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/admin/login', { replace: true });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <div className="m-auto">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
        </div>
        <nav className="mt-5">
          <Link 
            to="/admin/dashboard" 
            className="block py-2.5 px-4 rounded hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/projects" 
            className="block py-2.5 px-4 rounded hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            Projects
          </Link>
          <Link 
            to="/admin/skills" 
            className="block py-2.5 px-4 rounded hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            Skills
          </Link>
          <Link 
            to="/admin/education" 
            className="block py-2.5 px-4 rounded hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            Education
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full text-left py-2.5 px-4 rounded hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 mt-4"
          >
            Logout
          </button>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;