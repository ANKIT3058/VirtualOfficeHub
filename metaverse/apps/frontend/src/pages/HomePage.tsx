import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from "../components/Footer";
import '../index.css';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description?: string;
}

interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  alignment: string;
}

interface Space {
  id: number;
  title: string;
  image: string;
  isOwner: boolean;
  description?: string;
}

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Recent');
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  
  const carouselSlides: CarouselSlide[] = [
    {
      id: 1,
      title: 'ZEP Boxing',
      description: 'Defeat other players and become the champion!',
      tags: ['Official', 'Game'],
      image: '/api/placeholder/1200/400',
      alignment: 'text-start'
    },
    {
      id: 2,
      title: 'ZEP Study room',
      description: 'Study alone or with friends in our new study room!',
      tags: ['Official', 'Gathering'],
      image: '/api/placeholder/1200/400',
      alignment: 'text-center'
    },
    {
      id: 3,
      title: 'ZEP Running Track',
      description: 'Join our new racing game and show your speed!',
      tags: ['Official', 'Game'],
      image: '/api/placeholder/1200/400',
      alignment: 'text-end'
    }
  ];
  
  const spaces: Space[] = [
    {
      id: 1,
      title: 'demoOffice',
      image: '/api/placeholder/300/200',
      isOwner: true,
      description: "The demo office is a fully functional virtual workspace where teams can collaborate, hold meetings, and showcase projects. It features meeting rooms, breakout spaces, and customizable work areas."
    },
    {
      id: 2,
      title: 'Developer Hub',
      image: '/api/placeholder/300/200',
      isOwner: false,
      description: "A space designed for developers to collaborate on code, share ideas, and participate in code reviews. Features integrated tools for pair programming and technical discussions."
    },
    {
      id: 3,
      title: 'Creative Studio',
      image: '/api/placeholder/300/200',
      isOwner: true,
      description: "An open and inspiring environment for designers, artists and creative professionals. The studio includes digital whiteboards, mood board areas, and spaces for design critiques."
    },
    {
      id: 4,
      title: 'Conference Hall',
      image: '/api/placeholder/300/200',
      isOwner: false,
      description: "A large virtual venue perfect for hosting conferences, presentations, and large gatherings. Includes a main stage, breakout rooms, and networking areas."
    }
  ];
  
  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: "John Doe",
      role: "Frontend Developer",
      image: "/api/placeholder/100/100",
    },
    {
      name: "Jane Smith",
      role: "Backend Developer",
      image: "/api/placeholder/100/100",
    },
    {
      name: "Alice Brown",
      role: "UI/UX Designer",
      image: "/api/placeholder/100/100",
    },
    {
      name: "Bob Williams",
      role: "DevOps Engineer",
      image: "/api/placeholder/100/100",
      description:
        "Bob is responsible for maintaining our infrastructure, ensuring smooth deployments, and monitoring system health. With 5+ years in DevOps, he brings stability and speed to our workflows.",
    },
  ];
  
  // Auto-sliding functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % carouselSlides.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [carouselSlides.length]);
  
  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };
  
  const prevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1 + carouselSlides.length) % carouselSlides.length);
  };
  
  const nextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % carouselSlides.length);
  };

  const openModal = (space: Space) => {
    setSelectedSpace(space);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedSpace(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Content container that starts after navbar */}
      <div className="flex-grow pt-16"> {/* Add padding top to ensure content starts below navbar */}
        {/* Tailwind Carousel */}
        <div id="featuredCarousel" className="relative mb-6 overflow-hidden h-64 md:h-80">
          {/* Carousel Items */}
          {carouselSlides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="relative w-full h-full bg-gray-300">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="container mx-auto px-4">
                  <div className={`absolute bottom-10 ${
                    slide.alignment === 'text-start' ? 'left-10' : 
                    slide.alignment === 'text-end' ? 'right-10' : 'left-1/2 transform -translate-x-1/2'
                  }`}>
                    <div className="flex gap-2 mb-2">
                      {slide.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded-full bg-blue-500 text-white">{tag}</span>
                      ))}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">{slide.title}</h1>
                    <p className="text-white opacity-75 my-2">{slide.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Carousel Controls */}
          <button 
            className="absolute top-1/2 left-4 z-20 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-50 text-white"
            onClick={prevSlide}
          >
            <span className="sr-only">Previous</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="absolute top-1/2 right-4 z-20 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-50 text-white"
            onClick={nextSlide}
          >
            <span className="sr-only">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  activeSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Slide ${index + 1}`}
                aria-current={activeSlide === index ? 'true' : 'false'}
              ></button>
            ))}
          </div>
        </div>
        
        {/* Spaces Navigation and Search */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-6 border-b border-gray-200">
              <button 
                className={`py-2 px-1 text-lg ${activeTab === 'Recent' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('Recent')}
              >
                Recent
              </button>
              <button 
                className={`py-2 px-1 text-lg ${activeTab === 'My Spaces' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('My Spaces')}
              >
                My Spaces
              </button>
              <button 
                className={`py-2 px-1 text-lg ${activeTab === 'Team' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('Team')}
              >
                Team
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search Spaces" 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
              <button className="flex items-center gap-2 bg-gray-100 text-blue-600 px-4 py-2 rounded-lg border border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                </svg>
                Enter with Code
              </button>
              <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg">
                <span className="text-lg">+</span> Create Space
              </button>
            </div>
          </div>
        </div>
        
        {/* Content based on active tab */}
        <div className="max-w-7xl mx-auto px-4 mt-6 pb-20">
          {activeTab === 'Team' ? (
            // Team Members Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer ${
                    member.description ? "hover:ring hover:ring-blue-200" : ""
                  }`}
                  onClick={() => member.description && openModal({
                    id: 999,
                    title: member.name,
                    image: member.image,
                    isOwner: false,
                    description: member.description
                  })}
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mb-4 object-cover"
                    />
                    <h2 className="text-lg font-semibold">{member.name}</h2>
                    <p className="text-gray-600">{member.role}</p>
                    {member.description && (
                      <div className="mt-2 text-blue-500 text-sm">Click for details</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Spaces Grid (for both Recent and My Spaces tabs)
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {spaces
                .filter(space => activeTab === 'My Spaces' ? space.isOwner : true)
                .map((space) => (
                <div 
                  key={space.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md relative hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => openModal(space)}
                >
                  <div className="relative h-40">
                    {space.isOwner && (
                      <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-md z-10 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        OWNER
                      </div>
                    )}
                    <img src={space.image} alt={space.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <h3 className="text-md font-medium">{space.title}</h3>
                    <button className="text-gray-500" onClick={(e) => e.stopPropagation()}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Dialog/Modal using shadcn/ui */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectedSpace?.title}
            </DialogTitle>
            <button 
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          
          {selectedSpace && (
            <div className="flex flex-col items-center">
              <img
                src={selectedSpace.image}
                alt={selectedSpace.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              
              {selectedSpace.id === 999 ? (
                // Team member content
                <>
                  <p className="text-gray-600 mb-2">{teamMembers.find(m => m.name === selectedSpace.title)?.role}</p>
                  <p className="text-center text-gray-700">{selectedSpace.description}</p>
                </>
              ) : (
                // Space content
                <>
                  {selectedSpace.isOwner && (
                    <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-md flex items-center self-start mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      OWNER
                    </div>
                  )}
                  <DialogDescription className="text-center">
                    {selectedSpace.description}
                  </DialogDescription>
                  <div className="flex w-full justify-center mt-4 space-x-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                      Enter Space
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                      Share
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};