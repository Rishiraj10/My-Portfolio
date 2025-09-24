import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
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

// Auto-logout if user tries to access public site while logged in
useEffect(() => {
  if (!isAdminRoute && user) {
    console.log("👋 Logging out user from public area...");
    signOut(auth);
  }
}, [location.pathname, isAdminRoute, user]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {!isAdminRoute && <Nav />}

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

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;