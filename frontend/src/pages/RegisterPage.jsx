import { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full mb-3 px-3 py-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full mb-3 px-3 py-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded" required />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Register</button>
      </form>
    </div>
  );
}
