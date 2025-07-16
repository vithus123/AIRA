import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navigation from './components/Navigation';
import Chatbot from './components/Chatbot';
import FloatingAQIWidget from './components/FloatingAQIWidget';
import HomePage from './pages/HomePage';
import MonitoringPage from './pages/MonitoringPage';
import ProfilePage from './pages/ProfilePage';
import AIRALandingPage from './pages/AIRALandingPage';
import AuthSystem from './pages/AuthSystem';
import PersonalInfoPage from './pages/PersonalInfoPage';

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
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in, object = logged in
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

  // Show loading while checking auth state
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <AirDataContext.Provider value={{ airData, setAirData }}>
      <BrowserRouter>
        {user && <Navigation user={user} />}
        <Routes>
          {/* Public routes */}
          <Route path="/landing" element={<AIRALandingPage />} />
          <Route path="/auth/*" element={<AuthSystem />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={user ? <HomePage /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/monitoring"
            element={user ? <MonitoringPage /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/profile"
            element={user ? <ProfilePage hideAQIWidget={true} /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/personal-info"
            element={user ? <PersonalInfoPageWrapper /> : <Navigate to="/auth" replace />}
          />
          {/* Default route: redirect to landing or home based on auth */}
          <Route
            path="*"
            element={<Navigate to={user ? "/home" : "/landing"} replace />}
          />
        </Routes>
        {/* Only show FloatingAQIWidget if not on profile page and user is logged in */}
        {user && window.location.pathname !== '/profile' && <FloatingAQIWidget airData={airData} />}
        <Chatbot open={chatOpen} setOpen={setChatOpen} messages={chatMessages} setMessages={setChatMessages} newMessage={newMessage} setNewMessage={setNewMessage} />
      </BrowserRouter>
    </AirDataContext.Provider>
  );
};

export default App;
export { AirDataContext };

// Wrapper to provide profile state to PersonalInfoPage
function PersonalInfoPageWrapper() {
  const [profile, setProfile] = useState({
    fullName: 'Sarah Chen',
    username: 'sarahc_breathe',
    email: 'sarah.chen@email.com',
    phone: '+94 77 123 4567',
  });
  const [isEditing, setIsEditing] = useState(false);
  return <PersonalInfoPage profile={profile} setProfile={setProfile} isEditing={isEditing} setIsEditing={setIsEditing} />;
}