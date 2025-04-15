import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const { auth, logout } = useAuth();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white shadow px-6 py-4">
      <div className="text-xl font-bold">Virtual Office</div>
      <div className="flex gap-6 items-center">
        <Link to="/aboutus" className="hover:underline">About Us</Link>
        <Link to="/features" className="hover:underline">Features</Link>
        {
          !auth.token ?
          (<Link to="/signin">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
            Sign In
          </button></Link>) : 
          (<button onClick={logout} className="px-4 py-2 bg-red-500 rounded">
            Log Out
          </button>)
        }
      </div>
    </nav>
  );
};