import React, { useState, useEffect } from 'react';
import { 
  User, Heart, Bell, BarChart3, Settings, Edit3, Save, X, Eye, EyeOff, 
  Globe, Shield, Smartphone, Mail, Clock, Wind, Activity, Home, MapPin, 
  Thermometer, TreePine, Bird, Flower2, Leaf, Sun, Moon, Droplets, 
  AlertTriangle, CheckCircle, Calendar, Plus, Trash2, ChevronRight,
  Zap, Target, TrendingUp, CloudRain
} from 'lucide-react';

const AirQualityProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location] = useState({ lat: 6.9271, lon: 79.8612, name: 'Colombo, Sri Lanka' });
  
  const [profile, setProfile] = useState({
    // User Information
    fullName: 'Sarah Chen',
    username: 'sarahc_breathe',
    email: 'sarah.chen@email.com',
    phone: '+94 77 123 4567',
    
    // Health & Lifestyle
    ageGroup: '28-35',
    conditions: ['Asthma', 'Seasonal Allergies'],
    allergies: ['Pollen', 'Dust Mites', 'Pet Dander'],
    commutesRegularly: true,
    exercisesOutdoors: true,
    usesAirPurifier: true,
    workEnvironment: 'office',
    
    // Preferences & Alerts
    aqiThreshold: 100,
    notificationMethod: 'push',
    alertTimes: ['morning', 'evening'],
    locationAlerts: true,
    weatherAlerts: true,
    
    // Settings & Privacy
    language: 'English',
    dataSharing: true,
    researchOptIn: false,
    autoSync: true,
    accessibility: {
      highContrast: false,
      largeText: false,
      notifications: true
    }
  });

  const [weeklyStats] = useState({
    avgAQI: 78,
    outdoorHours: 42,
    indoorHours: 126,
    trend: 'improving',
    exposureRisk: 'low',
    healthScore: 85,
    weeklyData: [
      { day: 'Mon', aqi: 82, outdoor: 6 },
      { day: 'Tue', aqi: 75, outdoor: 8 },
      { day: 'Wed', aqi: 88, outdoor: 4 },
      { day: 'Thu', aqi: 71, outdoor: 7 },
      { day: 'Fri', aqi: 79, outdoor: 5 },
      { day: 'Sat', aqi: 65, outdoor: 8 },
      { day: 'Sun', aqi: 73, outdoor: 4 }
    ]
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'profile', label: 'Personal Info', icon: User },
    { id: 'health', label: 'Health & Lifestyle', icon: Heart },
    { id: 'alerts', label: 'Alerts & Notifications', icon: Bell },
    { id: 'analytics', label: 'Personal Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings & Privacy', icon: Settings }
  ];

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'green';
    if (aqi <= 100) return 'yellow';
    if (aqi <= 150) return 'orange';
    return 'red';
  };

  const getAQILabel = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    return 'Unhealthy';
  };

  const getHealthRisk = () => {
    const hasConditions = profile.conditions.length > 0;
    const ageRisk = profile.ageGroup === '65+' || profile.ageGroup === '0-5';
    if (hasConditions && ageRisk) return 'high';
    if (hasConditions || ageRisk) return 'moderate';
    return 'low';
  };

  const generatePersonalizedTips = () => {
    const tips = [];
    const risk = getHealthRisk();
    
    if (profile.conditions.includes('Asthma')) {
      tips.push({
        icon: <Heart className="w-5 h-5" />,
        title: 'Asthma Management',
        tip: 'Keep your inhaler handy when AQI exceeds 75. Consider indoor workouts on high pollution days.',
        priority: 'high'
      });
    }
    
    if (profile.exercisesOutdoors) {
      tips.push({
        icon: <Activity className="w-5 h-5" />,
        title: 'Exercise Timing',
        tip: 'Best outdoor exercise windows: 6-8 AM and 7-9 PM when air quality is typically better.',
        priority: 'medium'
      });
    }
    
    if (profile.commutesRegularly) {
      tips.push({
        icon: <MapPin className="w-5 h-5" />,
        title: 'Commute Planning',
        tip: 'Consider alternative routes through parks or less trafficked areas during peak pollution hours.',
        priority: 'medium'
      });
    }
    
    return tips;
  };

  const OverviewTab = () => (
    <div className="space-y-8">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-200 rounded-lg">
              <Wind className="w-6 h-6 text-blue-600" />
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${getAQIColor(weeklyStats.avgAQI)}-100 text-${getAQIColor(weeklyStats.avgAQI)}-800`}>
              {getAQILabel(weeklyStats.avgAQI)}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{weeklyStats.avgAQI}</h3>
          <p className="text-gray-600 text-sm">7-Day Average AQI</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-200 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{weeklyStats.healthScore}%</h3>
          <p className="text-gray-600 text-sm">Health Score</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-200 rounded-lg">
              <Sun className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-purple-600">{weeklyStats.outdoorHours}h</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{((weeklyStats.outdoorHours / (weeklyStats.outdoorHours + weeklyStats.indoorHours)) * 100).toFixed(0)}%</h3>
          <p className="text-gray-600 text-sm">Outdoor Exposure</p>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-teal-200 rounded-lg">
              <Shield className="w-6 h-6 text-teal-600" />
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              weeklyStats.exposureRisk === 'low' ? 'bg-green-100 text-green-800' :
              weeklyStats.exposureRisk === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {weeklyStats.exposureRisk}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Safe</h3>
          <p className="text-gray-600 text-sm">Exposure Risk</p>
        </div>
      </div>

      {/* Weekly Trend Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
          Weekly Air Quality Trend
        </h3>
        <div className="flex items-end justify-between h-40 mb-4">
          {weeklyStats.weeklyData.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className={`w-8 bg-${getAQIColor(day.aqi)}-400 rounded-t-lg mb-2 transition-all duration-300 hover:bg-${getAQIColor(day.aqi)}-500`}
                style={{ height: `${(day.aqi / 120) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-600">{day.day}</span>
              <span className="text-xs font-medium text-gray-800">{day.aqi}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Target className="w-6 h-6 mr-3 text-emerald-600" />
          Your Personalized Tips
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {generatePersonalizedTips().map((tip, index) => (
            <div key={index} className={`bg-white rounded-xl p-4 border-l-4 border-${tip.priority === 'high' ? 'red' : tip.priority === 'medium' ? 'yellow' : 'green'}-400`}>
              <div className="flex items-center mb-2">
                <div className="text-gray-600 mr-2">
                  {tip.icon}
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">{tip.title}</h4>
              </div>
              <p className="text-gray-600 text-xs">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <User className="w-6 h-6 mr-3 text-blue-600" />
            Personal Information
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => setProfile({...profile, fullName: e.target.value})}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile({...profile, username: e.target.value})}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const HealthTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Heart className="w-6 h-6 mr-3 text-rose-600" />
          Health & Lifestyle Profile
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Health Information</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
                <select
                  value={profile.ageGroup}
                  onChange={(e) => setProfile({...profile, ageGroup: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500"
                >
                  <option value="0-5">0-5 years</option>
                  <option value="6-17">6-17 years</option>
                  <option value="18-27">18-27 years</option>
                  <option value="28-35">28-35 years</option>
                  <option value="36-45">36-45 years</option>
                  <option value="46-64">46-64 years</option>
                  <option value="65+">65+ years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pre-existing Conditions</label>
                <div className="space-y-2">
                  {['Asthma', 'COPD', 'Heart Disease', 'Diabetes', 'Seasonal Allergies', 'Other'].map((condition) => (
                    <label key={condition} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.conditions.includes(condition)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfile({...profile, conditions: [...profile.conditions, condition]});
                          } else {
                            setProfile({...profile, conditions: profile.conditions.filter(c => c !== condition)});
                          }
                        }}
                        className="mr-3 text-rose-600 focus:ring-rose-500"
                      />
                      <span className="text-gray-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Daily Habits</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Environment</label>
                <select
                  value={profile.workEnvironment}
                  onChange={(e) => setProfile({...profile, workEnvironment: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500"
                >
                  <option value="office">Indoor Office</option>
                  <option value="outdoor">Outdoor Work</option>
                  <option value="mixed">Mixed Indoor/Outdoor</option>
                  <option value="home">Work from Home</option>
                </select>
              </div>
              
              <div className="space-y-3">
                {[
                  { key: 'commutesRegularly', label: 'Regular commuting (walking/cycling)', icon: '🚶‍♀️' },
                  { key: 'exercisesOutdoors', label: 'Regular outdoor exercise', icon: '🏃‍♂️' },
                  { key: 'usesAirPurifier', label: 'Uses air purifier at home', icon: '🌬️' }
                ].map((habit) => (
                  <label key={habit.key} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={profile[habit.key]}
                      onChange={(e) => setProfile({...profile, [habit.key]: e.target.checked})}
                      className="mr-3 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="text-gray-700">{habit.icon} {habit.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Health Risk Assessment */}
      <div className={`bg-gradient-to-br from-${getHealthRisk() === 'high' ? 'red' : getHealthRisk() === 'moderate' ? 'yellow' : 'green'}-50 to-${getHealthRisk() === 'high' ? 'red' : getHealthRisk() === 'moderate' ? 'yellow' : 'green'}-100 rounded-2xl p-6 border border-${getHealthRisk() === 'high' ? 'red' : getHealthRisk() === 'moderate' ? 'yellow' : 'green'}-200`}>
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Your Health Risk Level: <span className="ml-2 capitalize">{getHealthRisk()}</span>
        </h4>
        <p className="text-gray-700 mb-4">
          {getHealthRisk() === 'high' && 'You are at higher risk from air pollution. We recommend extra precautions and more frequent monitoring.'}
          {getHealthRisk() === 'moderate' && 'You have some increased sensitivity to air pollution. Regular monitoring is recommended.'}
          {getHealthRisk() === 'low' && 'You have normal sensitivity to air pollution. Standard precautions apply.'}
        </p>
      </div>
    </div>
  );

  const AlertsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Bell className="w-6 h-6 mr-3 text-amber-600" />
          Alert Preferences
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">AQI Thresholds</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alert when AQI exceeds: {profile.aqiThreshold}
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="25"
                  value={profile.aqiThreshold}
                  onChange={(e) => setProfile({...profile, aqiThreshold: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50 (Good)</span>
                  <span>100 (Moderate)</span>
                  <span>150 (Unhealthy)</span>
                  <span>200 (Very Unhealthy)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Notification Methods</h4>
            <div className="space-y-3">
              {[
                { key: 'push', label: 'App Push Notifications', icon: <Smartphone className="w-4 h-4" /> },
                { key: 'email', label: 'Email Alerts', icon: <Mail className="w-4 h-4" /> },
                { key: 'sms', label: 'SMS Notifications', icon: <Zap className="w-4 h-4" /> }
              ].map((method) => (
                <label key={method.key} className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="radio"
                    name="notificationMethod"
                    value={method.key}
                    checked={profile.notificationMethod === method.key}
                    onChange={(e) => setProfile({...profile, notificationMethod: e.target.value})}
                    className="mr-3 text-amber-600 focus:ring-amber-500"
                  />
                  <div className="text-amber-600 mr-2">{method.icon}</div>
                  <span className="text-gray-700">{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Alert Timing</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { key: 'morning', label: 'Morning (7-9 AM)', icon: <Sun className="w-4 h-4" /> },
              { key: 'noon', label: 'Midday (12-2 PM)', icon: <Sun className="w-4 h-4" /> },
              { key: 'evening', label: 'Evening (6-8 PM)', icon: <Moon className="w-4 h-4" /> },
              { key: 'night', label: 'Night (9-11 PM)', icon: <Moon className="w-4 h-4" /> }
            ].map((time) => (
              <label key={time.key} className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={profile.alertTimes.includes(time.key)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setProfile({...profile, alertTimes: [...profile.alertTimes, time.key]});
                    } else {
                      setProfile({...profile, alertTimes: profile.alertTimes.filter(t => t !== time.key)});
                    }
                  }}
                  className="mr-2 text-amber-600 focus:ring-amber-500"
                />
                <div className="text-amber-600 mr-2">{time.icon}</div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{time.label.split(' (')[0]}</div>
                  <div className="text-xs text-gray-500">{time.label.split(' (')[1]?.replace(')', '')}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-3 text-purple-600" />
          Personal Exposure Analytics
        </h3>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{weeklyStats.avgAQI}</div>
            <div className="text-sm text-gray-600">7-Day Avg AQI</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{weeklyStats.outdoorHours}h</div>
            <div className="text-sm text-gray-600">Outdoor Time</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">{weeklyStats.healthScore}%</div>
            <div className="text-sm text-gray-600">Health Score</div>
          </div>
          <div className="text-center p-4 bg-teal-50 rounded-xl">
            <div className="text-2xl font-bold text-teal-600 capitalize">{weeklyStats.trend}</div>
            <div className="text-sm text-gray-600">Trend</div>
          </div>
        </div>
        
        {/* Detailed Breakdown */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-4">Weekly Exposure Pattern</h4>
            <div className="space-y-2">
              {weeklyStats.weeklyData.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">{day.day}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs bg-${getAQIColor(day.aqi)}-100 text-${getAQIColor(day.aqi)}-800`}>
                      AQI {day.aqi}
                    </span>
                    <span className="text-xs text-gray-500">{day.outdoor}h outdoor</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-4">Risk Factors</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">High Risk Conditions</span>
                <span className="text-sm font-medium text-red-600">{profile.conditions.length > 0 ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Outdoor Activities</span>
                <span className="text-sm font-medium text-blue-600">{profile.exercisesOutdoors ? 'Regular' : 'Limited'}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Air Purifier Use</span>
                <span className="text-sm font-medium text-green-600">{profile.usesAirPurifier ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Settings className="w-6 h-6 mr-3 text-gray-600" />
          Settings & Privacy
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={profile.language}
                  onChange={(e) => setProfile({...profile, language: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500"
                >
                  <option value="English">English</option>
                  <option value="Sinhala">Sinhala</option>
                  <option value="Tamil">Tamil</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-gray-700">Accessibility Options</h5>
                {[
                  { key: 'highContrast', label: 'High Contrast Mode', desc: 'Better visibility for low vision' },
                  { key: 'largeText', label: 'Large Text', desc: 'Increase text size throughout app' },
                  { key: 'notifications', label: 'Screen Reader Notifications', desc: 'Enhanced accessibility for alerts' }
                ].map((option) => (
                  <label key={option.key} className="flex items-start p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={profile.accessibility[option.key]}
                      onChange={(e) => setProfile({
                        ...profile, 
                        accessibility: {...profile.accessibility, [option.key]: e.target.checked}
                      })}
                      className="mr-3 mt-1 text-gray-600 focus:ring-gray-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-800">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Privacy & Data</h4>
            <div className="space-y-4">
              {[
                { 
                  key: 'dataSharing', 
                  label: 'Share Data with Health Partners', 
                  desc: 'Help improve air quality research',
                  checked: profile.dataSharing 
                },
                { 
                  key: 'researchOptIn', 
                  label: 'Participate in Research Studies', 
                  desc: 'Contribute to air quality studies (anonymous)',
                  checked: profile.researchOptIn 
                },
                { 
                  key: 'autoSync', 
                  label: 'Auto-sync Data', 
                  desc: 'Automatically backup your data to cloud',
                  checked: profile.autoSync 
                }
              ].map((option) => (
                <label key={option.key} className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={option.checked}
                    onChange={(e) => setProfile({...profile, [option.key]: e.target.checked})}
                    className="mr-3 mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">{option.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Data Export */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          Data Management
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-4 bg-white rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors text-left">
            <div className="text-sm font-medium text-gray-800">Export Data</div>
            <div className="text-xs text-gray-500 mt-1">Download your complete profile</div>
          </button>
          <button className="p-4 bg-white rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors text-left">
            <div className="text-sm font-medium text-gray-800">Reset Settings</div>
            <div className="text-xs text-gray-500 mt-1">Return to default preferences</div>
          </button>
          <button className="p-4 bg-white rounded-xl border border-red-200 hover:bg-red-50 transition-colors text-left">
            <div className="text-sm font-medium text-red-600">Delete Account</div>
            <div className="text-xs text-red-400 mt-1">Permanently remove all data</div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 relative overflow-hidden">
      {/* Nature Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-green-600 animate-pulse">
          <TreePine size={40} />
        </div>
        <div className="absolute top-20 right-20 text-blue-600 animate-bounce">
          <Bird size={35} />
        </div>
        <div className="absolute bottom-20 left-20 text-teal-600">
          <Flower2 size={45} />
        </div>
        <div className="absolute bottom-10 right-10 text-green-500">
          <Leaf size={38} />
        </div>
        <div className="absolute top-1/2 left-1/4 text-blue-500 opacity-20">
          <Wind size={50} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-teal-600 to-green-600 p-3 rounded-full mr-4">
              <Wind className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-green-700 bg-clip-text text-transparent">
              Air Quality Profile
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your comprehensive air quality health dashboard
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{location.name}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-wrap gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-white text-blue-600 shadow-md' 
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'health' && <HealthTab />}
          {activeTab === 'alerts' && <AlertsTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl">
          <p className="text-gray-600 text-sm">
            Your privacy is important to us. All data is encrypted and stored securely. 
            <br />
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AirQualityProfile;