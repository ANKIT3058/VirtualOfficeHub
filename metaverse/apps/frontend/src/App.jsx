// import './App.css'
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Spaces } from "./pages/Spaces";
import { Arena } from './pages/Arena';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/home/spaces"
        element={
          <ProtectedRoute>
            <Spaces />
          </ProtectedRoute>
        }
      />

      <Route
        path="/arena/:spaceId"
        element={
          <ProtectedRoute>
            <Arena />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;

