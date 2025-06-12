import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Notifications from '../components/Notification'; // <-- Import here


export default function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success("Logout successfully");
    navigate('/login');
  };

  return (
    <nav className="bg-transparent shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-white">
        Lost & Found
      </Link>
      <div className="flex items-center space-x-4">
        {token ? (
          <>
            <Link to="/report-lost" className="text-white hover:text-blue-600">Report Lost</Link>
            <Link to="/report-found" className="text-white hover:text-blue-600">Report Found</Link>
            <Link to="/match" className="text-white hover:text-blue-600">Match & Claim</Link>
            <Notifications /> {/* <-- Notification bell here */}
            <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-blue-600">Login</Link>
            <Link to="/register" className="text-white hover:text-blue-600">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}