import React, { useState, useEffect } from 'react';
import { 
  Wind, Droplets, Thermometer, Activity, Heart, Shield, 
  AlertTriangle, MapPin, TrendingUp, Leaf, Factory, Car,
  Users, Brain, Baby, Eye, Clock, Bell, Info, MessageCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Tooltip } from 'recharts';

const AirQualityDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPollutant, setSelectedPollutant] = useState('pm25');
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock real-time data
  const airData = {
    pm25: 45.2, pm10: 78.3, o3: 65, no2: 32, so2: 18, co: 1.2,
    temperature: 28.5, humidity: 72, aqi: 85, location: "Colombo, Sri Lanka"
  };

  const historicalData = Array.from({length: 24}, (_, i) => ({
    hour: `${23-i}:00`,
    pm25: 45 + Math.random() * 20,
    pm10: 78 + Math.random() * 15,
    aqi: 85 + Math.random() * 30
  }));

  const pollutantBreakdown = [
    {name: 'PM2.5', value: 35, color: '#3B82F6'},
    {name: 'PM10', value: 25, color: '#10B981'},
    {name: 'O3', value: 20, color: '#F59E0B'},
    {name: 'NO2', value: 12, color: '#EF4444'},
    {name: 'Others', value: 8, color: '#8B5CF6'}
  ];

  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return { status: 'Good', color: 'text-green-500', bg: 'bg-green-50' };
    if (aqi <= 100) return { status: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-50' };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive', color: 'text-orange-500', bg: 'bg-orange-50' };
    if (aqi <= 200) return { status: 'Unhealthy', color: 'text-red-500', bg: 'bg-red-50' };
    return { status: 'Very Unhealthy', color: 'text-purple-500', bg: 'bg-purple-50' };
  };

  const airFacts = [
    { icon: Leaf, fact: "Trees can reduce PM2.5 by up to 27% in urban areas", color: "text-green-600" },
    { icon: Car, fact: "Vehicle emissions contribute 50% of urban air pollution", color: "text-blue-600" },
    { icon: Factory, fact: "Industrial activities release 40% of global SO2", color: "text-orange-600" },
    { icon: Heart, fact: "Air pollution causes 7 million premature deaths annually", color: "text-red-600" }
  ];

  const recommendations = [
    { icon: Shield, title: "Wear N95 Mask", desc: "Essential when AQI > 100", priority: airData.aqi > 100 },
    { icon: Activity, title: "Limit Outdoor Exercise", desc: "Exercise indoors today", priority: airData.pm25 > 35 },
    { icon: Leaf, title: "Use Air Purifier", desc: "Keep indoor air clean", priority: true },
    { icon: Heart, title: "Stay Hydrated", desc: "Helps body cope with pollution", priority: true }
  ];

  const StatusCard = ({ icon: Icon, title, value, unit, trend, color, limit }) => (
    <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-green-100/30 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${color}-100 rounded-xl flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${color}-600`} />
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className={`w-4 h-4 ${trend > 0 ? 'text-red-500 rotate-0' : 'text-green-500 rotate-180'}`} />
            <span className={`text-xs font-medium ${trend > 0 ? 'text-red-500' : 'text-green-500'}`}>
              {Math.abs(trend)}%
            </span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className={`text-3xl font-bold ${color}-600 mb-1`}>{value}</p>
        <p className="text-sm text-gray-600">{unit}</p>
        {limit && (
          <div className="mt-3 text-xs text-gray-500">
            Limit: {limit} • <span className={value > parseInt(limit) ? 'text-red-600' : 'text-green-600'}>
              {value > parseInt(limit) ? 'Exceeded' : 'Safe'}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              AiraWatch Pro
            </h1>
            <div className="flex items-center space-x-4 mt-2 text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{airData.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-medium">Live</span>
              </div>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors">
            <Bell className="w-5 h-5" />
            <span>Alerts</span>
          </button>
        </div>

        {/* AQI Hero Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Air Quality Index</h2>
              <div className={`text-7xl font-bold ${getAQIStatus(airData.aqi).color} mb-2`}>
                {Math.round(airData.aqi)}
              </div>
              <div className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${getAQIStatus(airData.aqi).bg} ${getAQIStatus(airData.aqi).color}`}>
                {getAQIStatus(airData.aqi).status}
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Health Impact</span>
                  <span className="font-medium">Moderate Risk</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-400 to-yellow-400 h-3 rounded-full" style={{width: `${(airData.aqi/200)*100}%`}}></div>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <XAxis dataKey="hour" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip contentStyle={{backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '12px'}} />
                  <Line type="monotone" dataKey="aqi" stroke="#3B82F6" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Real-time Pollutant Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatusCard icon={Wind} title="PM2.5" value={Math.round(airData.pm25)} unit="μg/m³" trend={-12} color="bg-blue text-blue" limit="25" />
          <StatusCard icon={Activity} title="PM10" value={Math.round(airData.pm10)} unit="μg/m³" trend={8} color="bg-green text-green" limit="50" />
          <StatusCard icon={Thermometer} title="Temperature" value={Math.round(airData.temperature)} unit="°C" trend={2} color="bg-orange text-orange" />
          <StatusCard icon={Droplets} title="Humidity" value={Math.round(airData.humidity)} unit="%" trend={-5} color="bg-purple text-purple" />
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pollutant Breakdown Pie Chart */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Pollutant Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pollutantBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                    {pollutantBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '12px'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {pollutantBreakdown.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 24-Hour Trend Bar Chart */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-xl font-bold text-gray-800 mb-6">24-Hour PM2.5 Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalData.slice(-12)}>
                  <XAxis dataKey="hour" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip contentStyle={{backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '12px'}} />
                  <Bar dataKey="pm25" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Air Facts & Recommendations */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Air Facts */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Info className="w-6 h-6 text-blue-600 mr-2" />
              Air Quality Facts
            </h3>
            <div className="space-y-4">
              {airFacts.map((fact, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <fact.icon className={`w-5 h-5 ${fact.color}`} />
                  </div>
                  <p className="text-gray-700 text-sm">{fact.fact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Users className="w-6 h-6 text-green-600 mr-2" />
              Health Recommendations
            </h3>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className={`p-4 rounded-xl border-l-4 ${
                  rec.priority ? 'bg-red-50 border-red-400' : 'bg-blue-50 border-blue-400'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${rec.priority ? 'bg-red-100' : 'bg-blue-100'}`}>
                      <rec.icon className={`w-5 h-5 ${rec.priority ? 'text-red-600' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                      <p className="text-sm text-gray-600">{rec.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Impact Dashboard */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Health Impact Assessment</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {icon: Heart, label: "Cardiovascular", risk: "Medium", color: "text-red-500"},
              {icon: Activity, label: "Respiratory", risk: "Low", color: "text-green-500"},
              {icon: Brain, label: "Neurological", risk: "Low", color: "text-blue-500"},
              {icon: Baby, label: "Children", risk: "High", color: "text-orange-500"}
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-white/50 rounded-xl">
                <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-2`} />
                <h4 className="font-semibold text-gray-800">{item.label}</h4>
                <p className={`text-sm font-medium ${item.color}`}>{item.risk} Risk</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chatbot */}
        {showChatbot && (
          <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">AirQ Assistant</span>
              </div>
              <button onClick={() => setShowChatbot(false)} className="text-white hover:text-gray-200">×</button>
            </div>
            <div className="p-4 h-full">
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <p className="text-sm">Hi! I can help you understand air quality data and health recommendations.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["What is PM2.5?", "Health tips", "AQI meaning"].map(q => (
                  <button key={q} className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 z-40"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default AirQualityDashboard;