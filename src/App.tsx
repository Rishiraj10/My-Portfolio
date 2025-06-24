import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';
import ProjectsAdmin from './admin/ProjectsAdmin';
import SkillsAdmin from './admin/SkillsAdmin';
import EducationAdmin from './admin/EducationAdmin';
import Dashboard from './admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const { user } = useAuth();
 const location = useLocation();
 const isAdminRoute = location.pathname.startsWith('/admin');

// 🔥 Auto-logout if user tries to access public site while logged in
useEffect(() => {
  if (!isAdminRoute && user) {
    console.log("👋 Logging out user from public area...");
    signOut(auth);
  }
}, [location.pathname, isAdminRoute, user]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {!isAdminRoute && (
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio
              </span>
              <div className="flex items-center space-x-8">
                <div className="hidden md:flex space-x-8">
                  <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">About</a>
                  <a href="#skills" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Skills</a>
                  <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Projects</a>
                  <a href="#education" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Education</a>
                  <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Contact</a>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      )}

      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Education />
              <Contact />
            </>
          } />
          
          <Route path="/admin/login" element={<Login />} />
          
          <Route element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/projects" element={<ProjectsAdmin />} />
            <Route path="/admin/skills" element={<SkillsAdmin />} />
            <Route path="/admin/education" element={<EducationAdmin />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminRoute && (
        <footer className="bg-gray-900 dark:bg-black text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-8 md:mb-0">
                <h3 className="text-xl font-bold">Let's Connect</h3>
                <div className="flex space-x-4 mt-4">
                  <a href="https://github.com/Rishiraj10" className="hover:text-indigo-400">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/rishiraj101/" className="hover:text-indigo-400">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=rkystore4@gmail.com&su=Portfolio%20Inquiry&body=Hi%20there,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20know%20more%20about..." 
                    className="hover:text-indigo-400" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                © 2024 Rishi Raj. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;