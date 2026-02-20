import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AnalysisProvider } from './contexts/AnalysisContext';
import AppLayout from './layouts/AppLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Upload from './pages/Upload';
import RiskGraphs from './modules/RiskGraphs';
import PersonaExposure from './modules/PersonaExposure';
import AttackVectors from './modules/AttackVectors';
import PhishingSimulation from './modules/PhishingSimulation';
import CorrelationDepth from './modules/CorrelationDepth';
import VisibilityScore from './modules/VisibilityScore';
import TimelineEstimation from './modules/TimelineEstimation';
import WeightedRiskScore from './modules/WeightedRiskScore';

function App() {
  return (
    <AuthProvider>
      <AnalysisProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/upload" element={<Upload />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Navigate to="/dashboard/risk-graphs" replace />} />
                  <Route path="risk-graphs" element={<RiskGraphs />} />
                  <Route path="persona" element={<PersonaExposure />} />
                  <Route path="attack-vectors" element={<AttackVectors />} />
                  <Route path="phishing" element={<PhishingSimulation />} />
                  <Route path="correlation" element={<CorrelationDepth />} />
                  <Route path="visibility" element={<VisibilityScore />} />
                  <Route path="timeline" element={<TimelineEstimation />} />
                  <Route path="risk-score" element={<WeightedRiskScore />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AnalysisProvider>
    </AuthProvider>
  );
}

export default App;
