import React, { useEffect, useState } from 'react';

const API_TOKEN = 'e1213d2ed4a27670332784066ed57ba7a61d67c5';

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

const getAQIGradient = (aqi) => {
  if (aqi <= 50) return 'from-blue-400 via-blue-500 to-blue-600';
  if (aqi <= 100) return 'from-blue-500 via-blue-600 to-blue-700';
  if (aqi <= 150) return 'from-blue-600 via-blue-700 to-blue-800';
  if (aqi <= 200) return 'from-blue-700 via-blue-800 to-blue-900';
  if (aqi <= 300) return 'from-blue-800 via-blue-900 to-slate-900';
  return 'from-blue-900 via-slate-900 to-black';
};

const FloatingAQIWidget = () => {
  const [aqi, setAqi] = useState(0);

  useEffect(() => {
    const url = `https://api.waqi.info/feed/colombo/?token=${API_TOKEN}`;
    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.status === 'ok') {
          setAqi(json.data.aqi ?? 0);
        }
      })
      .catch(() => setAqi(0));
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="group relative">
        {/* Glow effect */}
        <div className={`absolute -inset-3 bg-gradient-to-r from-blue-400 via-green-500 to-blue-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-all duration-500 animate-pulse`}></div>
        
        {/* Secondary glow */}
        <div className={`absolute -inset-2 bg-gradient-to-r from-sky-300 via-blue-300 to-green-300 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-all duration-300`}></div>
        
        {/* Tertiary glow */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-blue-200 via-blue-300 to-green-400 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-300 animate-pulse delay-1000`}></div>
        
        {/* Main widget */}
        <div className="relative bg-gradient-to-br from-white/90 via-blue-50/80 to-sky-50/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-blue-200/40 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-1">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100"></div>
            <div className="absolute top-2 right-2 w-28 h-28 bg-gradient-to-br from-blue-200 to-sky-300 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-2 left-2 w-24 h-24 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-sky-300 to-blue-300 rounded-full blur-2xl animate-pulse delay-500"></div>
            <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-full blur-xl animate-pulse delay-700"></div>
          </div>
          
          {/* Content */}
          <div className="relative p-6">
            <div className="flex items-center space-x-4">
              {/* AQI Circle */}
              <div className="relative">
                {/* Outer spinning ring */}
                <div className={`absolute -inset-3 rounded-full bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 opacity-40 blur-sm animate-spin-slow`}></div>
                
                {/* Main circle */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getAQIGradient(aqi)} flex items-center justify-center shadow-2xl ring-4 ring-blue-200/50 hover:ring-blue-300/70 transition-all duration-300 hover:shadow-blue-500/50`}>
                  <div className={`text-2xl font-bold text-white drop-shadow-lg`}>
                    {Math.round(aqi)}
                  </div>
                </div>
                
                {/* Multiple pulse animations */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-30 animate-ping`}></div>
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-sky-300 to-blue-400 opacity-20 animate-ping delay-500`}></div>
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-indigo-300 to-blue-500 opacity-15 animate-ping delay-1000`}></div>
              </div>
              
              {/* Text content */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AQI Now</h3>
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full animate-pulse shadow-lg"></div>
                </div>
                <p className={`text-sm font-semibold ${getAQIColor(aqi)} mb-1 drop-shadow-sm`}>
                  {getAQIStatus(aqi)}
                </p>
                <p className="text-xs text-blue-600 font-medium">
                  📍 Colombo, Sri Lanka
                </p>
              </div>
            </div>
            
            {/* Bottom accent line */}
            <div className={`mt-4 h-2 rounded-full bg-gradient-to-r  from-blue-600 via-blue-500 to-green-400 opacity-80 shadow-lg`}></div>
            
            {/* Additional decorative elements */}
            <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-br from-blue-300 to-sky-300 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute bottom-3 left-3 w-2.5 h-2.5 bg-gradient-to-br from-sky-400 to-blue-400 rounded-full opacity-50 animate-pulse delay-700"></div>
            <div className="absolute top-5 left-5 w-1.5 h-1.5 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full opacity-60 animate-pulse delay-300"></div>
            <div className="absolute bottom-5 right-5 w-2 h-2 bg-gradient-to-br from-blue-600 via-blue-500 to-green-400 rounded-full opacity-40 animate-pulse delay-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingAQIWidget;