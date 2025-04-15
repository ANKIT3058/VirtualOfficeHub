import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth.token) {
    // not logged in → redirect to signin
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
