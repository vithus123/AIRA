import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Wind, Thermometer, Droplets, Eye, AlertTriangle, Shield, MessageCircle, X, Send, Home, BarChart3, User, Leaf, Heart, Activity, TrendingUp, MapPin, Clock, Info } from 'lucide-react';
import Navigation from './components/Navigation';
import Chatbot from './components/Chatbot';
import FloatingAQIWidget from './components/FloatingAQIWidget';
import HomePage from './pages/HomePage';
import MonitoringPage from './pages/MonitoringPage';
import ProfilePage from './pages/ProfilePage';
import AIRALandingPage from './pages/AIRALandingPage';
import AuthSystem from './pages/AuthSystem';

// Create context for air quality data
const AirDataContext = React.createContext();

const App = () => {
  const [airData, setAirData] = useState({
    pm25: 45,
    pm10: 78,
    temperature: 28,
    humidity: 75,
    aqi: 89
  });

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hello! I\'m here to help you with air pollution information for Colombo. How can I assist you today?' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const auth = getAuth();

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAirData(prev => ({
        pm25: Math.max(0, prev.pm25 + (Math.random() - 0.5) * 10),
        pm10: Math.max(0, prev.pm10 + (Math.random() - 0.5) * 15),
        temperature: Math.max(20, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(40, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
        aqi: Math.max(0, Math.min(300, prev.aqi + (Math.random() - 0.5) * 20))
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // AQI utility functions
  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'text-green-500';
    if (aqi <= 100) return 'text-yellow-500';
    if (aqi <= 150) return 'text-orange-500';
    return 'text-red-500';
  };

  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    return 'Unhealthy';
  };

  return (
    <AirDataContext.Provider value={{ airData, getAQIColor, getAQIStatus, chatOpen, setChatOpen, chatMessages, setChatMessages, newMessage, setNewMessage }}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          {/* Only show Navigation, Chatbot, and FloatingAQIWidget if user is logged in */}
          {user && <Navigation />}
          <main className="max-w-7xl mx-auto px-8 py-8">
            <Routes>
              {/* If not logged in, only show landing page */}
              {!user ? (
                <Route path="*" element={<AIRALandingPage />} />
              ) : (
                <>
                  <Route path="/" element={<AIRALandingPage />} />
                  <Route path="/landing" element={<AIRALandingPage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/monitoring" element={<MonitoringPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/loginsignup" element={<AuthSystem />} />
                </>
              )}
            </Routes>
          </main>
          {/* Only show these if user is logged in */}
          {user && <Chatbot />}
          {user && <FloatingAQIWidget />}
        </div>
      </BrowserRouter>
    </AirDataContext.Provider>
  );
};

export default App;
export { AirDataContext };