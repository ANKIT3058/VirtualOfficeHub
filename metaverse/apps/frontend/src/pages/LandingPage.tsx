import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import '../index.css';

interface FeatureItem {
  heading: string;
  sub: string;
  desc: string;
  reverse: boolean;
}

interface ColumnItem {
  imageAlt?: string;
  heading: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

export const LandingPage: React.FC = () => {
  const featureItems: FeatureItem[] = [
    {
      heading: "Step into an immersive, multi‑user arena",
      sub: "IMMERSIVE ARENA",
      desc: "Join a shared digital playground where multiple avatars roam, spark spontaneous chats, and collaborate side‑by‑side—just like gathering around the office whiteboard.",
      reverse: false
    },
    {
      heading: "Collaborate seamlessly with video, screen share & chat",
      sub: "SEAMLESS COLLABORATION",
      desc: "Launch crystal‑clear video calls, instantly share your screen, and chat in one fluid environment so your team stays in sync without ever missing a beat.",
      reverse: true
    },
    {
      heading: "Feel the magic of real‑world proximity presence",
      sub: "PROXIMITY PRESENCE",
      desc: "As avatars draw near, live video pop‑ups and audio streams activate automatically—turning chance encounters into meaningful, in‑the‑moment conversations.",
      reverse: false
    }
  ];

  const columnItems: ColumnItem[] = [
    {
      heading: "Heading",
      description: "Some representative placeholder content for the three columns of text below the carousel.",
      linkText: "View details »",
      linkUrl: "#"
    },
    {
      heading: "Heading",
      description: "Some representative placeholder content for the three columns of text below the carousel.",
      linkText: "View details »",
      linkUrl: "#"
    },
    {
      heading: "Heading",
      description: "Some representative placeholder content for the three columns of text below the carousel.",
      linkText: "View details »",
      linkUrl: "#"
    }
  ];

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
      </div>
      <div className="container mx-auto px-4 py-10">

        {/* Main Heading */}
        <div className="text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            The in–person moments
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            you've been missing
          </h1>
        </div>

        {/* Featurettes */}
        {featureItems.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col-reverse md:flex-row ${item.reverse ? 'md:flex-row-reverse' : ''} items-center gap-12 py-16`}
          >
            {/* Text Section */}
            <div className="md:w-1/2 text-center md:text-left px-6">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">{item.sub}</p>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">{item.heading}</h2>
              <p className="text-lg text-gray-600">{item.desc}</p>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2 px-6 flex justify-center">
              <div className="w-[450px] h-[300px] bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center shadow-md">
                {/* Replace this div with an actual <img src="..." alt="..." /> */}
                <span className="text-gray-400 text-xl">Image</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Three Columns of Text */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-10 md:space-y-0 md:space-x-6">
          {columnItems.map((column, index) => (
            <div key={index} className="text-center max-w-sm">
              <div className="w-36 h-36 mx-auto rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-sm">140x140</span>
              </div>
              <h2 className="text-xl font-semibold mt-4">{column.heading}</h2>
              <p className="mt-2 text-gray-600">
                {column.description}
              </p>
              <a href={column.linkUrl} className="mt-4 inline-block px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
                {column.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};