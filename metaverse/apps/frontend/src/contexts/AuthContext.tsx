import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { jwtDecode } from 'jwt-decode';
  
  // Define the type for the decoded JWT payload (customize as per your token)
  interface DecodedUser {
    uid: string;
    username?: string;
    // Add any additional fields your JWT may contain
    [key: string]: any;
  }
  
  // Define the auth state type
  interface AuthState {
    token: string | null;
    user: DecodedUser | null;
  }
  
  // Define the context type
  interface AuthContextType {
    auth: AuthState;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
  }
  
  // Define props for the AuthProvider
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  // Create the context with initial dummy type, will override below
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  // Custom hook to use the AuthContext
  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  
  // AuthProvider component
  export const AuthProvider = ({ children }: AuthProviderProps) => {
    const storedToken = localStorage.getItem('token');
    const storedUser = storedToken ? jwtDecode<DecodedUser>(storedToken) : null;
  
    const [auth, setAuth] = useState<AuthState>({
      token: storedToken,
      user: storedUser,
    });
  
    const navigate = useNavigate();
  
    const login = async (username: string, password: string) => {
      try {
        // Replace with real fetch logic
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Login failed');
  
        localStorage.setItem('token', data.token);
        const user = jwtDecode<DecodedUser>(data.token);
        setAuth({ token: data.token, user });
        navigate('/home/spaces');
      } catch (error) {
        console.error('Login failed:', error);
      }
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
  