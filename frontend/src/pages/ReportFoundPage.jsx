import { useState } from 'react';
import API from '../utils/api'; // Make sure your Axios instance is properly configured
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ReportFoundPage() {
  const [form, setForm] = useState({
    itemName: '',
    category: '',
    description: '',
    foundLocation: '',
    dateFound: '',
    contactInfo: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value || '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/found', form);
      toast.success('Found item reported successfully!');
      setForm({
        itemName: '',
        category: '',
        description: '',
        foundLocation: '',
        dateFound: '',
        contactInfo: '',
      });
    } catch (err) {
      toast.error('Failed to report found item');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Report Found Item</h2>
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

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="w-full border px-3 py-2 rounded-lg" />

        <input name="foundLocation" value={form.foundLocation} onChange={handleChange} placeholder="Found Location" required className="w-full border px-3 py-2 rounded-lg" />

        <input type="date" name="dateFound" value={form.dateFound} onChange={handleChange} required className="w-full border px-3 py-2 rounded-lg" />

        <input name="contactInfo" value={form.contactInfo} onChange={handleChange} placeholder="Contact Info" required className="w-full border px-3 py-2 rounded-lg" />

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Submit</button>
      </form>
    </div>
  );
}
