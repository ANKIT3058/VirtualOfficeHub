import React from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { HomePage } from "./pages/HomePage";
// import { Arena } from './pages/Arena';
import ProtectedRoute from "./components/ProtectedRoute";
import phaserGame from "./PhaserGame";

// 🧩 Use a normal button styled with Tailwind
const DevLaunchButton = () => {
  if (!import.meta.env.DEV) return null;

  const handleLaunch = () => {
    const bootstrap = phaserGame.scene.keys.bootstrap as any;
    bootstrap.launchGame();
  };

  return (
    <button
      onClick={handleLaunch}
      className="fixed bottom-4 right-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg z-50"
    >
      Launch Game (Dev)
    </button>
  );
};

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/:uid/spaces"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/arena/:spaceId" element={<ProtectedRoute><Arena /></ProtectedRoute>} /> */}
      </Routes>

      {/* 💻 Show only in dev */}
      <DevLaunchButton />
    </>
  );
};

export default App;
