import { useState, useEffect } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { logout as logoutAction } from '../features/auth/authSlice';
import { Moon, Sun, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const uid = useSelector((state: RootState) => state.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(
    () => localStorage.getItem('theme') === 'dark'
  );

  const toggleDarkMode = () => {
    setDarkMode(dm => {
      const next = !dm;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const navLinkClass: NavLinkProps['className'] = ({ isActive }) =>
    `transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1 border-b-2 ${
      isActive
        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
        : 'border-transparent text-gray-700 dark:text-gray-200'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-wide">
          Virtual Office
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center text-lg">
          <NavLink to="/home" className={navLinkClass}>Home</NavLink>
          <NavLink to="/aboutus" className={navLinkClass}>About Us</NavLink>
          <NavLink to={`/${uid ?? 'uid'}/space`} className={navLinkClass}>My Spaces</NavLink>
          <NavLink to="/features" className={navLinkClass}>Features</NavLink>

          {!token ? (
            <NavLink to="/signin">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Sign In
              </button>
            </NavLink>
          ) : (
            <button
              onClick={() => dispatch(logoutAction())}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Log Out
            </button>
          )}

          <button onClick={toggleDarkMode} className="ml-4">
            {darkMode
              ? <Sun className="w-5 h-5 text-yellow-400" />
              : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />}
          </button>
        </div>

        {/* Mobile Hamburger + Dark Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleDarkMode}>
            {darkMode
              ? <Sun className="w-6 h-6 text-yellow-400" />
              : <Moon className="w-6 h-6 text-gray-700 dark:text-gray-200" />}
          </button>
          <button onClick={() => setMenuOpen(o => !o)}>
            {menuOpen
              ? <X className="w-6 h-6 text-white dark:text-white" />
              : <Menu className="w-6 h-6 text-white dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 items-start px-4 text-lg">
          <NavLink to="/home" className={navLinkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/aboutus" className={navLinkClass} onClick={() => setMenuOpen(false)}>About Us</NavLink>
          <NavLink to={`/${uid ?? 'uid'}/space`} className={navLinkClass} onClick={() => setMenuOpen(false)}>My Spaces</NavLink>
          <NavLink to="/features" className={navLinkClass} onClick={() => setMenuOpen(false)}>Features</NavLink>

          {!token ? (
            <NavLink to="/signin" onClick={() => setMenuOpen(false)}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full">
                Sign In
              </button>
            </NavLink>
          ) : (
            <button
              onClick={() => { dispatch(logoutAction()); setMenuOpen(false); }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition w-full"
            >
              Log Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
