// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken'); // Correct token key

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};