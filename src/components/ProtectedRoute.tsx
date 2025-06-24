import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login', { replace: true, state: { from: location.pathname } });
    }
  }, [user, loading, navigate, location]);

  // 👇 Don't render anything until loading is done
  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white">Checking auth...</div>;
  }

  // 👇 Render only if user is present
  return user ? <>{children}</> : null;
  
};

export default ProtectedRoute;
