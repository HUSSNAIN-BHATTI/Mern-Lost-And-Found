import { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful!');
      navigate('/'); // Change later to dashboard or homepage
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-transparent">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full mb-3 px-3 py-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded" required />
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Login</button>
      </form>
    </div>
  );
}
