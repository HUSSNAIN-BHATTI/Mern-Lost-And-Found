import { useState } from 'react';
import API from '../utils/api'; // Make sure your Axios instance is properly configured
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ReportLostPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    itemName: '',
    category: '',
    description: '',
    lastSeenLocation: '',
    dateLost: '',
    contactInfo: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You must be logged in to report a lost item.');
        return;
      }

      const res = await API.post('/lost', form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message || 'Lost item reported successfully');
      setForm({
        itemName: '',
        category: '',
        description: '',
        lastSeenLocation: '',
        dateLost: '',
        contactInfo: '',
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to report lost item');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Report Lost Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="itemName" value={form.itemName} onChange={handleChange} placeholder="Item Name" required className="w-full border px-3 py-2 rounded-lg" />
        
        <select name="category" value={form.category} onChange={handleChange} required className="w-full border px-3 py-2 rounded-lg">
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Wallet">Wallet</option>
          <option value="Clothing">Clothing</option>
          <option value="Document">Document</option>
          <option value="Other">Other</option>
        </select>

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2 rounded-lg" />

        <input name="lastSeenLocation" value={form.lastSeenLocation} onChange={handleChange} placeholder="Last Seen Location" required className="w-full border px-3 py-2 rounded-lg" />

        <input type="date" name="dateLost" value={form.dateLost} onChange={handleChange} required className="w-full border px-3 py-2 rounded-lg" />

        <input name="contactInfo" value={form.contactInfo} onChange={handleChange} placeholder="Contact Info" required className="w-full border px-3 py-2 rounded-lg" />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
}
