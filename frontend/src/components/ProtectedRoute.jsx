import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAnalysis } from '../contexts/AnalysisContext';

function ProtectedRoute() {
  const { user } = useAuth();
  const { analysisResult } = useAnalysis();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!analysisResult) {
    return <Navigate to="/upload" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
