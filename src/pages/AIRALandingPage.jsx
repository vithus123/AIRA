import React, { useState, useEffect, useRef } from 'react';
import {
  Wind, Leaf, Heart, Shield, Sparkles, Pause, Play, Volume2, VolumeX, ChevronRight
} from 'lucide-react';
import AuthSystem from './AuthSystem';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from '../firestore';

const AIRALandingPage = () => {
  // State for UI
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('register');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const videoRef = useRef(null);
  const auth = getAuth();

  // Air quality facts
  const airQualityFacts = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Nature's Guardian",
      description: "A single mature tree can absorb 48 pounds of CO₂ annually and produce enough oxygen for two people.",
      color: "from-green-400 to-emerald-600"
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: "Invisible Threat",
      description: "PM2.5 particles are 30 times smaller than human hair width, penetrating deep into your lungs.",
      color: "from-blue-400 to-cyan-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Life Impact",
      description: "Clean air can add up to 1-2 years to your life expectancy and improve overall wellbeing.",
      color: "from-pink-400 to-rose-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Urban Solution",
      description: "Green walls and rooftop gardens can reduce local air pollution by up to 60% in urban areas.",
      color: "from-purple-400 to-indigo-600"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Future Vision",
      description: "Smart cities with AI-powered air monitoring can predict and prevent pollution before it happens.",
      color: "from-amber-400 to-orange-600"
    }
  ];

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex(prev => (prev + 1) % airQualityFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Video handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
      video.play().then(() => setIsVideoPlaying(true)).catch(() => setIsVideoPlaying(false));
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    const handleError = () => console.warn('Video failed to load');

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Fetch user name from Firestore
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUserName(userDoc.data().name || "");
          } else {
            setUserName("");
          }
        } catch (e) {
          setUserName("");
        }
      } else {
        setUserName("");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isVideoPlaying) video.pause();
    else video.play().catch(() => {});
    setIsVideoPlaying(!isVideoPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isVideoMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cpath fill='%2322c55e' d='M0 0h1920v1080H0z'/%3E%3C/svg%3E"
        >
          <source src="\images\AIRA.mp4" type="video/mp4" />
          <source src="/api/placeholder/video/nature" type="video/mp4" />
        </video>
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-emerald-600 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-20 min-h-screen flex flex-col">
        <header className="flex justify-between items-center p-6 lg:p-8">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-lg p-3 rounded-2xl border border-white/20">
              <Wind className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-wide">AIRA</h1>
              <p className="text-white/80 text-sm">Air Intelligence & Reality Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleVideo}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
            >
              {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleMute}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
            >
              {isVideoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Logout
              </button>
            ) : null}
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            {user && userName && (
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Welcome, {userName}!</h2>
            )}
            <div className="mb-12">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20 mb-8">
                <Sparkles className="w-5 h-5 text-green-300" />
                <span className="text-white/90 font-medium">Breathe Smart, Live Better</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Your AI-Powered
                <span className="block bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                  Air Guardian
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Experience the future of air quality monitoring with AIRA's intelligent ecosystem. 
                Real-time insights, personalized recommendations, and fantasy-inspired visualizations 
                for a healthier tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                {!user && (
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setShowAuthModal(true);
                    }}
                    className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25 flex items-center space-x-2"
                  >
                    <span>Start Your Journey</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
            <div className="mb-16">
              <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${airQualityFacts[currentFactIndex].color} mb-4`}>
                <div className="text-white">
                  {airQualityFacts[currentFactIndex].icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {airQualityFacts[currentFactIndex].title}
              </h3>
              <p className="text-white/80 text-lg leading-relaxed">
                {airQualityFacts[currentFactIndex].description}
              </p>
              <div className="flex justify-center space-x-2 mt-6">
                {airQualityFacts.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentFactIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className="p-6 lg:p-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between text-white/70 text-sm">
            <div className="mb-4 md:mb-0">
              <p>© 2025 AIRA. Crafted with 💚 for a cleaner future.</p>
            </div>
            <div className="flex items-center space-x-6">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-white cursor-pointer transition-colors">Support</span>
            </div>
          </div>
        </footer>
      </div>
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthSystem open={showAuthModal} mode={authMode} onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default AIRALandingPage;