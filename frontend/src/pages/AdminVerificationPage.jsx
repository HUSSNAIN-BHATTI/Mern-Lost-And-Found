import React, { useEffect, useState } from 'react';
import API from '../utils/api'; // Assuming API is set up to interact with backend

const AdminVerificationPage = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    // Fetch claims from the backend
    const fetchClaims = async () => {
      try {
        const response = await API.get('/admin/claims', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure the admin token is used
          },
        });
        setClaims(response.data);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };

    fetchClaims();
  }, []);

  const handleStatusChange = async (claimId, status) => {
    try {
      const response = await API.put(`/admin/claims/${claimId}`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Update the status locally
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim._id === claimId ? { ...claim, status } : claim
        )
      );
    } catch (error) {
      console.error('Error updating claim status:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Admin Claim Verification</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Claim ID</th>
            <th className="px-4 py-2">Lost Item</th>
            <th className="px-4 py-2">Found Item</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim._id}>
              <td className="border px-4 py-2">{claim._id}</td>
              <td className="border px-4 py-2">{claim.lostItem.itemName}</td>
              <td className="border px-4 py-2">{claim.foundItem.itemName}</td>
              <td className="border px-4 py-2">{claim.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleStatusChange(claim._id, 'Approved')}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(claim._id, 'Rejected')}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVerificationPage;
