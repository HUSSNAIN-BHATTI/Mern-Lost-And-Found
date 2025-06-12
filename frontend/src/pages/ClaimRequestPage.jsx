import React, { useState } from 'react';
import API from '../utils/api'; // Assuming API is set up to interact with backend

const ClaimRequestPage = () => {
  const [form, setForm] = useState({
    lostItemId: '',
    foundItemId: '',
    verificationDocuments: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm({
        ...form,
        [name]: files[0], // Only handle the first file
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('lostItemId', form.lostItemId);
    formData.append('foundItemId', form.foundItemId);
    formData.append('verificationDocuments', form.verificationDocuments);

    try {
      const response = await API.post('/claim', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage('Claim submitted successfully!');
      setForm({
        lostItemId: '',
        foundItemId: '',
        verificationDocuments: null,
      });
    } catch (error) {
      console.error('Error submitting claim:', error);
      setMessage('Error submitting claim. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Submit Claim Request</h2>
      {message && <p className="text-center mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="lostItemId"
          value={form.lostItemId}
          onChange={handleChange}
          placeholder="Lost Item ID"
          required
          className="w-full border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          name="foundItemId"
          value={form.foundItemId}
          onChange={handleChange}
          placeholder="Found Item ID"
          required
          className="w-full border px-3 py-2 rounded-lg"
        />
        <input
          type="file"
          name="verificationDocuments"
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit Claim
        </button>
      </form>
    </div>
  );
};

export default ClaimRequestPage;
