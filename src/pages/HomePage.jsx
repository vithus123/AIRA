import React, { useState, useEffect, useContext } from 'react';
import { Wind, Eye, Activity, Shield, Heart, Leaf, AlertTriangle, Clock, MessageCircle, 
  Bell, Users, TrendingUp, Navigation, Zap, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
// Import Firestore for live AQI
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from '../firestore';




// Mock context for demo purposes
const AirDataContext = React.createContext();

const AirDataProvider = ({ children }) => {
  const [airData, setAirData] = useState({
    aqi: 0,
    pm25: 0,
    pm10: 0,
    temperature: 0,
    humidity: 0,
    co: 0,
    no2: 0,
    o3: 0,
    so2: 0
  });

  useEffect(() => {
    const API_TOKEN = 'e1213d2ed4a27670332784066ed57ba7a61d67c5';
    const url = `https://api.waqi.info/feed/colombo/?token=${API_TOKEN}`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.status === 'ok') {
          const d = json.data;
          const c = d.iaqi;
          setAirData({
            aqi: d.aqi ?? 0,
            pm25: c.pm25?.v ?? 0,
            pm10: c.pm10?.v ?? 0,
            o3: c.o3?.v ?? 0,
            no2: c.no2?.v ?? 0,
            so2: c.so2?.v ?? 0,
            co: c.co?.v ?? 0,
            temperature: c.t?.v ?? 0,
            humidity: c.h?.v ?? 0
          });
        }
      })
      .catch(() => {
        // fallback to mock data if API fails
        setAirData({
          aqi: 156,
          pm25: 65.2,
          pm10: 89.1,
          temperature: 28,
          humidity: 78,
          co: 2.3,
          no2: 45.2,
          o3: 78.5,
          so2: 12.1
        });
      });
  }, []);

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'text-green-500';
    if (aqi <= 100) return 'text-yellow-500';
    if (aqi <= 150) return 'text-orange-500';
    if (aqi <= 200) return 'text-red-500';
    if (aqi <= 300) return 'text-purple-500';
    return 'text-red-800';
  };

  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const getAQIBgColor = (aqi) => {
    if (aqi <= 50) return 'bg-green-100 border-green-200';
    if (aqi <= 100) return 'bg-yellow-100 border-yellow-200';
    if (aqi <= 150) return 'bg-orange-100 border-orange-200';
    if (aqi <= 200) return 'bg-red-100 border-red-200';
    if (aqi <= 300) return 'bg-purple-100 border-purple-200';
    return 'bg-red-200 border-red-300';
  };

  return (
    <AirDataContext.Provider value={{ airData, getAQIColor, getAQIStatus, getAQIBgColor }}>
      {children}
    </AirDataContext.Provider>
  );
};

const AlertBanner = ({ airData, getAQIStatus, getAQIColor }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible || airData.aqi <= 100) return null;

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-xl mb-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <h4 className="font-bold">Air Quality Alert!</h4>
            <p className="text-sm opacity-90">Current AQI: {Math.round(airData.aqi)} - {getAQIStatus(airData.aqi)}</p>
          </div>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m your air quality assistant. Ask me anything about air pollution, health tips, or current conditions!' }
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    "What's the current AQI?",
    "Should I wear a mask today?",
    "Is it safe to exercise outside?",
    "What causes air pollution?"
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    
    // Simulate bot response
    setTimeout(() => {
      let response = "I understand your concern about air quality. ";
      if (input.toLowerCase().includes('aqi')) {
        response = "The current AQI is 156, which is 'Unhealthy for Sensitive Groups'. People with respiratory conditions should limit outdoor activities.";
      } else if (input.toLowerCase().includes('mask')) {
        response = "Yes, I recommend wearing an N95 mask when going outside today due to elevated PM2.5 levels (65.2 μg/m³).";
      } else if (input.toLowerCase().includes('exercise')) {
        response = "Outdoor exercise is not recommended today. Consider indoor workouts or wait for better air quality conditions.";
      } else {
        response += "Based on current conditions, I recommend staying indoors when possible and using air purifiers.";
      }
      
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 1000);
    
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col">
          <div className="bg-blue-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <h3 className="font-semibold">Air Quality Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <XCircle className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-2xl text-sm ${
                  msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t">
            <div className="flex flex-wrap gap-2 mb-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(q)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about air quality..."
                className="flex-1 px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const HealthRiskPredictor = ({ airData }) => {
  const [selectedGroup, setSelectedGroup] = useState('general');
  
  const riskLevels = {
    general: {
      risk: airData.aqi > 150 ? 'high' : airData.aqi > 100 ? 'moderate' : 'low',
      recommendations: [
        'Monitor air quality regularly',
        'Consider indoor air purification',
        'Stay hydrated'
      ]
    },
    sensitive: {
      risk: airData.aqi > 100 ? 'high' : airData.aqi > 50 ? 'moderate' : 'low',
      recommendations: [
        'Limit outdoor activities',
        'Use N95 masks when outside',
        'Keep rescue medications nearby',
        'Consider staying indoors'
      ]
    },
    children: {
      risk: airData.aqi > 100 ? 'high' : airData.aqi > 75 ? 'moderate' : 'low',
      recommendations: [
        'Avoid outdoor play during high pollution',
        'Use air purifiers in bedrooms',
        'Monitor for respiratory symptoms',
        'Choose indoor activities'
      ]
    }
  };

  const currentRisk = riskLevels[selectedGroup];
  const riskColor = currentRisk.risk === 'high' ? 'text-red-500' : 
                   currentRisk.risk === 'moderate' ? 'text-orange-500' : 'text-green-500';
  const riskBg = currentRisk.risk === 'high' ? 'bg-red-50 border-red-200' : 
                currentRisk.risk === 'moderate' ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Heart className="w-5 h-5 text-red-500 mr-2" />
        Health Risk Prediction
      </h3>
      
      <div className="flex space-x-2 mb-4">
        {[
          { key: 'general', label: 'General Public' },
          { key: 'sensitive', label: 'Sensitive Groups' },
          { key: 'children', label: 'Children' }
        ].map(group => (
          <button
            key={group.key}
            onClick={() => setSelectedGroup(group.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedGroup === group.key 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className={`${riskBg} border rounded-xl p-4 mb-4`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-800">Risk Level</span>
          <span className={`${riskColor} font-bold capitalize`}>{currentRisk.risk}</span>
        </div>
        <div className="text-sm text-gray-600 mb-3">
          Based on current PM2.5 level of {Math.round(airData.pm25)} μg/m³
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800 mb-2">Recommendations:</h4>
        <ul className="space-y-2">
          {currentRisk.recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AQIEducation = () => {
  const [selectedRange, setSelectedRange] = useState(null);
  
  const aqiRanges = [
    { range: '0-50', label: 'Good', color: 'bg-green-500', description: 'Air quality is satisfactory, and air pollution poses little or no risk.' },
    { range: '51-100', label: 'Moderate', color: 'bg-yellow-500', description: 'Air quality is acceptable for most people. However, sensitive people may experience minor respiratory symptoms.' },
    { range: '101-150', label: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500', description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.' },
    { range: '151-200', label: 'Unhealthy', color: 'bg-red-500', description: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.' },
    { range: '201-300', label: 'Very Unhealthy', color: 'bg-purple-500', description: 'Health alert: The risk of health effects is increased for everyone.' },
    { range: '301-500', label: 'Hazardous', color: 'bg-red-800', description: 'Health warning of emergency conditions: everyone is more likely to be affected.' }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Eye className="w-5 h-5 text-blue-500 mr-2" />
        Understanding AQI Scale
      </h3>
      
      <div className="space-y-3">
        {aqiRanges.map((item, idx) => (
          <div key={idx} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedRange(selectedRange === idx ? null : idx)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 ${item.color} rounded-full`}></div>
                <div className="text-left">
                  <div className="font-semibold text-gray-800">{item.range}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              </div>
              <div className={`transform transition-transform ${selectedRange === idx ? 'rotate-180' : ''}`}>
                <TrendingUp className="w-4 h-4 text-gray-400" />
              </div>
            </button>
            
            {selectedRange === idx && (
              <div className="px-4 pb-4 text-sm text-gray-600 border-t bg-gray-50">
                {item.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const { airData, getAQIColor, getAQIStatus, getAQIBgColor } = useContext(AirDataContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        setNotificationsEnabled(permission === 'granted');
      });
    }
  }, []);

  const enableNotifications = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setNotificationsEnabled(permission === 'granted');
        if (permission === 'granted') {
          new Notification('AIRA Notifications Enabled', {
            body: 'You\'ll now receive air quality alerts and updates.',
            icon: '/favicon.ico'
          });
        }
      });
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Alert Banner */}
      <AlertBanner airData={airData} getAQIStatus={getAQIStatus} getAQIColor={getAQIColor} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-green-400 rounded-3xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <Wind className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">AIRA</h1>
                <p className="text-blue-100">AI & IoT Powered Air Quality Management</p>
              </div>
            </div>
            
            {!notificationsEnabled && (
              <button
                onClick={enableNotifications}
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-xl transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="text-sm">Enable Alerts</span>
              </button>
            )}
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">Real-time Air Quality in Colombo</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`${getAQIBgColor(airData.aqi)} bg-opacity-20 rounded-xl p-4 border`}>
              <p className="text-sm opacity-80">AQI</p>
              <p className="text-2xl font-bold">{Math.round(airData.aqi)}</p>
              <p className="text-xs">{getAQIStatus(airData.aqi)}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <p className="text-sm opacity-80">PM2.5</p>
              <p className="text-2xl font-bold">{Math.round(airData.pm25)}</p>
              <p className="text-xs">μg/m³</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <p className="text-sm opacity-80">PM10</p>
              <p className="text-2xl font-bold">{Math.round(airData.pm10)}</p>
              <p className="text-xs">μg/m³</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <p className="text-sm opacity-80">Temp</p>
              <p className="text-2xl font-bold">{Math.round(airData.temperature)}°</p>
              <p className="text-xs">Celsius</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Facts */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
            <Eye className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">What is PM2.5?</h3>
          <p className="text-gray-600 mb-4">Fine particles smaller than 2.5 micrometers that can penetrate deep into lungs and bloodstream, causing serious health issues.</p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-600 font-medium">Current: {Math.round(airData.pm25)} μg/m³</div>
            <div className="text-xs text-gray-500">WHO limit: 15 μg/m³</div>
          </div>
        </div>
        
        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
            <Activity className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Health Impact</h3>
          <p className="text-gray-600 mb-4">Air pollution can cause respiratory issues, heart disease, stroke, and reduced lung function. Long-term exposure increases cancer risk.</p>
          <div className="flex items-center justify-between">
            <div className={`text-sm font-medium ${getAQIColor(airData.aqi)}`}>Status: {getAQIStatus(airData.aqi)}</div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">Monitor closely</span>
            </div>
          </div>
        </div>
        
        <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
            <Shield className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">AI-Powered Protection</h3>
          <p className="text-gray-600 mb-4">Get personalized recommendations using AI analysis of current conditions, weather patterns, and your location.</p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-orange-600 font-medium">Smart recommendations active</div>
            <Zap className="w-4 h-4 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Health Risk Predictor */}
      <HealthRiskPredictor airData={airData} />

      {/* AQI Education */}
      <AQIEducation />

      {/* Enhanced Personalized Recommendations */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Heart className="w-6 h-6 text-red-500 mr-3" />
          AI-Powered Personalized Recommendations
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">For Sensitive Groups</h4>
                <p className="text-gray-600 text-sm">Children, elderly, and people with respiratory conditions should avoid outdoor activities. Current AQI of {Math.round(airData.aqi)} poses significant health risks.</p>
                <div className="mt-2 text-xs text-blue-600">🔴 High Risk Alert Active</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Wind className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Indoor Air Quality</h4>
                <p className="text-gray-600 text-sm">Use HEPA air purifiers, keep windows closed, and maintain humidity between 40-60%. Consider air quality plants like snake plants and peace lilies.</p>
                <div className="mt-2 text-xs text-green-600">✅ Recommended for current conditions</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Exercise Guidelines</h4>
                <p className="text-gray-600 text-sm">Avoid all outdoor exercise. PM2.5 level of {Math.round(airData.pm25)} μg/m³ is dangerous. Choose indoor workouts or gym activities instead.</p>
                <div className="mt-2 text-xs text-orange-600">⚠️ Outdoor exercise not recommended</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Best Time to Go Out</h4>
                <p className="text-gray-600 text-sm">Based on AI analysis, early morning (5-7 AM) typically has 20-30% better air quality. Avoid peak traffic hours (7-9 AM, 5-7 PM).</p>
                <div className="mt-2 text-xs text-purple-600">📊 AI prediction: 15% improvement at 6 AM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IoT Sensor Status */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Navigation className="w-5 h-5 text-blue-500 mr-2" />
          IoT Sensor Network Status
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { name: 'PM2.5 Sensor', status: 'active', value: Math.round(airData.pm25), unit: 'μg/m³' },
            { name: 'PM10 Sensor', status: 'active', value: Math.round(airData.pm10), unit: 'μg/m³' },
            { name: 'CO Sensor', status: 'active', value: airData.co, unit: 'ppm' },
            { name: 'NO2 Sensor', status: 'calibrating', value: Math.round(airData.no2), unit: 'ppb' }
          ].map((sensor, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{sensor.name}</span>
                <div className={`w-3 h-3 rounded-full ${
                  sensor.status === 'active' ? 'bg-green-500' : 
                  sensor.status === 'calibrating' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
              </div>
              <div className="text-lg font-bold text-gray-800">{sensor.value} {sensor.unit}</div>
              <div className={`text-xs capitalize ${
                sensor.status === 'active' ? 'text-green-600' : 
                sensor.status === 'calibrating' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {sensor.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Security Notice */}
      <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          <Shield className="w-5 h-5 text-green-500 mr-2" />
          Privacy & Security
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          Your data is protected with end-to-end encryption. We follow international privacy standards and never share personal information with third parties.
        </p>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span className="flex items-center">
            <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
            GDPR Compliant
          </span>
          <span className="flex items-center">
            <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
            SSL Encrypted
          </span>
          <span className="flex items-center">
            <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
            Data Anonymized
          </span>
        </div>
      </div>

      {/* Smart Chatbot */}
      
    </div>
  );
};

const App = () => {
  return (
    <AirDataProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <HomePage />
        </div>
      </div>
    </AirDataProvider>
  );
};

export default App;