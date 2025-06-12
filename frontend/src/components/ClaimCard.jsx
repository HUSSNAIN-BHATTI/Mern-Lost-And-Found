// src/components/ClaimCard.js
import React from 'react';

const ClaimCard = ({ claim }) => {
  const { _id, user, lostItem, foundItem, document, status } = claim;

  const handleStatusChange = async (newStatus) => {
    try {
      await API.put(`/admin/claims/${_id}`, { status: newStatus });
      window.location.reload();  // Reload after status change
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-80">
      <h3 className="text-xl font-semibold">{lostItem.name} vs {foundItem.name}</h3>
      <p>Status: {status}</p>
      <p>Claimed by: {user.name}</p>
      <p>
        Document: <a href={`http://localhost:5000/${document}`} target="_blank" className="text-blue-500">View</a>
      </p>
      <div className="mt-4 space-x-4">
        <button
          onClick={() => handleStatusChange('approved')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Approve
        </button>
        <button
          onClick={() => handleStatusChange('rejected')}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ClaimCard;
