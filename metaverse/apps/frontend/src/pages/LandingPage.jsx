import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
import '../index.css'

export const LandingPage = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="relative">
        <video
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-screen object-cover z-0"
        >
          <source
            src="https://asset-zepetoful.zepeto.io/lZS2as4ZxDWZ/9P8X33wK87gtw7fX6Km48aG/Tm4Gf3wK8aD50a0ea4e7e36264312512abc49f95888twAmqDeqkAkO/landing_2.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
          <h1 className="text-4xl text-white font-bold">Landing Page</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};