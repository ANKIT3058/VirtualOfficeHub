import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// AuthContext.jsx
export const AuthProvider = ({ children }) => {
  // read token (and decode) right away
  const storedToken = localStorage.getItem('token');
  const storedUser = storedToken ? jwtDecode(storedToken) : null;

  const [auth, setAuth] = useState({
    token: storedToken,
    user: storedUser
  });
  const navigate = useNavigate();

  const login = async (username, password) => {
    // ... your fetch + localStorage.setItem
    setAuth({ token: data.token, user: jwtDecode(data.token) });
    navigate('/home/spaces');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
