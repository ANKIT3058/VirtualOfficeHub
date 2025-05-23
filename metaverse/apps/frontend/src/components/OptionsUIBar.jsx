import { useState } from "react";
import { PhoneOff, Video, VideoOff, Mic, MicOff, PhoneCall } from "lucide-react";

const OptionsUIBar = ({ show }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [isOnCall, setIsOnCall] = useState(false);

  if (!show) return null; // Hide when no token

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-3 rounded-2xl shadow-lg flex space-x-6 items-center">
      {/* Mute/Unmute Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition"
      >
        {isMuted ? (
          <MicOff className="w-6 h-6 text-red-500" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </button>

      {/* Toggle Video Button */}
      <button
        onClick={() => setVideoOn(!videoOn)}
        className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition"
      >
        {videoOn ? (
          <Video className="w-6 h-6" />
        ) : (
          <VideoOff className="w-6 h-6 text-red-500" />
        )}
      </button>

      {/* End Call Button */}
      <button
        onClick={() => setIsOnCall(!isOnCall)}
        className="p-3 rounded-full bg-red-600 hover:bg-red-500 transition"
      >
        {isOnCall ? (
          <PhoneCall className="w-6 h-6" />
        ) : (
          <PhoneOff className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default OptionsUIBar;