import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {Zenitho} from "uvcanvas";
import { ProtectedRoute, AdminProtectedRoute } from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ReportLostPage from './pages/ReportLostPage';
import ReportFoundPage from './pages/ReportFoundPage';
import MatchPage from './pages/MatchClaimPage';
import AdminVerificationPage from './pages/AdminVerificationPage';
import ClaimRequestPage from './pages/ClaimRequestPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        <div className="fixed inset-0 z-0">
          <Zenitho />
        </div>
        <div className="relative z-10">
          <NavBar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected User Routes */}
            <Route path="/report-lost" element={
              <ProtectedRoute>
                <ReportLostPage />
              </ProtectedRoute>
            } />
            <Route path="/report-found" element={
              <ProtectedRoute>
                <ReportFoundPage />
              </ProtectedRoute>
            } />
            <Route path="/match" element={
              <ProtectedRoute>
                <MatchPage />
              </ProtectedRoute>
            } />
            <Route path="/claim" element={
              <ProtectedRoute>
                <ClaimRequestPage />
              </ProtectedRoute>
            } />

            {/* Protected Admin Routes */}
            <Route path="/admin/verification" element={
              <AdminProtectedRoute>
                <AdminVerificationPage />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } />

            {/* Catch all route for undefined paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;