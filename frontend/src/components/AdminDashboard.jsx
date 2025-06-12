// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import ClaimCard from './ClaimCard';

const AdminDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const { data } = await API.get('/admin/claims');
        setClaims(data);  // Store fetched claims in state
      } catch (err) {
        setError('Failed to load claims');
      }
    };
    fetchClaims();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-center p-6">Admin Dashboard</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex flex-wrap justify-center gap-6">
        {claims.map((claim) => (
          <ClaimCard key={claim._id} claim={claim} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
