import React, { useState } from 'react';
import { 
  User, Heart, Bell, BarChart3, Settings, Edit3, Save, Target,
  Activity, MapPin, Shield, Award, AlertTriangle, CheckCircle, 
  TrendingUp, TrendingDown, Clock, Wind, Droplets, Sun, Moon,
  Database, Filter, Info, Star, Bookmark, ChevronRight, Plus
} from 'lucide-react';

const AirQualityProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    fullName: 'Sarah Chen',
    username: 'sarahc_breathe',
    email: 'sarah.chen@email.com',
    phone: '+94 77 123 4567',
    ageGroup: '28-35',
    conditions: ['Asthma', 'Seasonal Allergies'],
    workEnvironment: 'office',
    commutesRegularly: true,
    exercisesOutdoors: true,
    usesAirPurifier: true,
    preferredAQI: 50,
    monitoringFrequency: 'hourly',
    aqiThreshold: 100,
    alertSeverity: 'moderate',
    pollutionAlerts: true,
    locationAlerts: true,
    weatherAlerts: true,
    healthAlerts: true,
    dataSharing: true,
    researchOptIn: false,
    autoSync: true,
    personalGoals: ['Reduce outdoor exposure on high pollution days', 'Improve indoor air quality']
  });

  const stats = {
    avgAQI: 78,
    healthScore: 85,
    pollutionSaved: 15,
    weeklyData: [
      { day: 'Mon', aqi: 82, status: 'moderate' },
      { day: 'Tue', aqi: 75, status: 'good' },
      { day: 'Wed', aqi: 88, status: 'caution' },
      { day: 'Thu', aqi: 71, status: 'good' },
      { day: 'Fri', aqi: 79, status: 'moderate' },
      { day: 'Sat', aqi: 65, status: 'good' },
      { day: 'Sun', aqi: 73, status: 'good' }
    ]
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'health', label: 'Health', icon: Heart },
    { id: 'monitoring', label: 'Monitoring', icon: Activity },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'recommendations', label: 'Recommendations', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'bg-emerald-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getHealthRisk = () => {
    const hasConditions = profile.conditions.length > 0;
    const ageRisk = profile.ageGroup === '65+' || profile.ageGroup === '0-5';
    if (hasConditions && ageRisk) return 'high';
    if (hasConditions || ageRisk) return 'moderate';
    return 'low';
  };

  const InputField = ({
  label,
  value = '',
  onChange,
  type = 'text',
  disabled = false,
  options = null,
  placeholder = '',
  name = '',
  id = '',
  autoComplete = 'off',
}) => {
  const inputId = id || name;

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {options ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 transition"
        >
          <option value="" disabled>
            {placeholder || 'Select an option'}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 transition"
        />
      )}
    </div>
  );
};


  const CheckboxField = ({ label, checked, onChange, description }) => (
    <label className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-3 mt-1 text-blue-600 focus:ring-blue-500 rounded"
      />
      <div>
        <span className="text-gray-700 font-medium">{label}</span>
        {description && <div className="text-xs text-gray-500 mt-1">{description}</div>}
      </div>
    </label>
  );

  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <User className="w-6 h-6 mr-3 text-blue-600" />
            Personal Information
          </h3>
          <button
            onClick={() => window.location.href = '/personal-info'}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all shadow-lg"
          >
            View / Edit
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            label="Full Name"
            value={profile.fullName}
            onChange={(e) => setProfile({...profile, fullName: e.target.value})}
            disabled={!isEditing}
          />
          <InputField
            label="Username"
            value={profile.username}
            onChange={(e) => setProfile({...profile, username: e.target.value})}
            disabled={!isEditing}
          />
          <InputField
            label="Email"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            type="email"
            disabled={!isEditing}
          />
          <InputField
            label="Phone"
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
            type="tel"
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl p-6 text-white shadow-xl">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Award className="w-6 h-6 mr-2" />
          Your Air Quality Journey
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.healthScore}%</div>
            <div className="text-sm opacity-90">Health Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.pollutionSaved}h</div>
            <div className="text-sm opacity-90">Pollution Avoided</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{profile.personalGoals.length}</div>
            <div className="text-sm opacity-90">Active Goals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">7</div>
            <div className="text-sm opacity-90">Days Tracked</div>
          </div>
        </div>
      </div>
    </div>
  );

  const HealthTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Heart className="w-6 h-6 mr-3 text-rose-600" />
          Health & Lifestyle
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Health Information</h4>
            <div className="space-y-4">
              <InputField
                label="Age Group"
                value={profile.ageGroup}
                onChange={(e) => setProfile({...profile, ageGroup: e.target.value})}
                options={[
                  { value: '0-5', label: '0-5 years' },
                  { value: '6-17', label: '6-17 years' },
                  { value: '18-27', label: '18-27 years' },
                  { value: '28-35', label: '28-35 years' },
                  { value: '36-45', label: '36-45 years' },
                  { value: '46-64', label: '46-64 years' },
                  { value: '65+', label: '65+ years' }
                ]}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Conditions</label>
                <div className="space-y-2">
                  {['Asthma', 'COPD', 'Heart Disease', 'Seasonal Allergies'].map((condition) => (
                    <CheckboxField
                      key={condition}
                      label={condition}
                      checked={profile.conditions.includes(condition)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProfile({...profile, conditions: [...profile.conditions, condition]});
                        } else {
                          setProfile({...profile, conditions: profile.conditions.filter(c => c !== condition)});
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Lifestyle</h4>
            <div className="space-y-4">
              <InputField
                label="Work Environment"
                value={profile.workEnvironment}
                onChange={(e) => setProfile({...profile, workEnvironment: e.target.value})}
                options={[
                  { value: 'office', label: 'Indoor Office' },
                  { value: 'outdoor', label: 'Outdoor Work' },
                  { value: 'mixed', label: 'Mixed' },
                  { value: 'home', label: 'Work from Home' }
                ]}
              />
              
              <div className="space-y-3">
                <CheckboxField
                  label="Regular commuting"
                  checked={profile.commutesRegularly}
                  onChange={(e) => setProfile({...profile, commutesRegularly: e.target.checked})}
                />
                <CheckboxField
                  label="Regular outdoor exercise"
                  checked={profile.exercisesOutdoors}
                  onChange={(e) => setProfile({...profile, exercisesOutdoors: e.target.checked})}
                />
                <CheckboxField
                  label="Uses air purifier"
                  checked={profile.usesAirPurifier}
                  onChange={(e) => setProfile({...profile, usesAirPurifier: e.target.checked})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`bg-gradient-to-br ${getHealthRisk() === 'high' ? 'from-red-100 to-red-200' : getHealthRisk() === 'moderate' ? 'from-amber-100 to-amber-200' : 'from-emerald-100 to-emerald-200'} rounded-2xl p-6 shadow-xl`}>
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Health Risk Level: <span className="ml-2 capitalize">{getHealthRisk()}</span>
        </h4>
        <p className="text-gray-700">
          {getHealthRisk() === 'high' && 'Higher risk from air pollution. Extra precautions and frequent monitoring recommended.'}
          {getHealthRisk() === 'moderate' && 'Some increased sensitivity to air pollution. Regular monitoring recommended.'}
          {getHealthRisk() === 'low' && 'Normal sensitivity to air pollution. Continue standard precautions.'}
        </p>
      </div>
    </div>
  );

  const MonitoringTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Activity className="w-6 h-6 mr-3 text-blue-600" />
          Monitoring Settings
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred AQI Level: {profile.preferredAQI}
                </label>
                <input
                  type="range"
                  min="25"
                  max="100"
                  step="5"
                  value={profile.preferredAQI}
                  onChange={(e) => setProfile({...profile, preferredAQI: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gradient-to-r from-emerald-200 to-yellow-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <InputField
                label="Monitoring Frequency"
                value={profile.monitoringFrequency}
                onChange={(e) => setProfile({...profile, monitoringFrequency: e.target.value})}
                options={[
                  { value: 'realtime', label: 'Real-time (15 min)' },
                  { value: 'hourly', label: 'Hourly' },
                  { value: 'daily', label: 'Daily Summary' },
                  { value: 'ondemand', label: 'On Demand' }
                ]}
              />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Current Status</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-blue-500 to-teal-500 text-white rounded-lg">
                <div className="text-2xl font-bold">{stats.avgAQI}</div>
                <div className="text-sm opacity-90">Current AQI</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-emerald-500 to-green-500 text-white rounded-lg">
                <div className="text-2xl font-bold">PM2.5</div>
                <div className="text-sm opacity-90">Main Pollutant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AlertsTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Bell className="w-6 h-6 mr-3 text-amber-600" />
          Alert Preferences
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Thresholds</h4>
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
                  className="w-full h-2 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <InputField
                label="Alert Severity"
                value={profile.alertSeverity}
                onChange={(e) => setProfile({...profile, alertSeverity: e.target.value})}
                options={[
                  { value: 'low', label: 'Low - Essential only' },
                  { value: 'moderate', label: 'Moderate - Important updates' },
                  { value: 'high', label: 'High - All changes' }
                ]}
              />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Notification Types</h4>
            <div className="space-y-3">
              <CheckboxField
                label="High Pollution Alerts"
                checked={profile.pollutionAlerts}
                onChange={(e) => setProfile({...profile, pollutionAlerts: e.target.checked})}
                description="When AQI exceeds threshold"
              />
              <CheckboxField
                label="Location Alerts"
                checked={profile.locationAlerts}
                onChange={(e) => setProfile({...profile, locationAlerts: e.target.checked})}
                description="Air quality changes in your area"
              />
              <CheckboxField
                label="Weather Alerts"
                checked={profile.weatherAlerts}
                onChange={(e) => setProfile({...profile, weatherAlerts: e.target.checked})}
                description="Weather affecting air quality"
              />
              <CheckboxField
                label="Health Recommendations"
                checked={profile.healthAlerts}
                onChange={(e) => setProfile({...profile, healthAlerts: e.target.checked})}
                description="Personalized health advice"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-3 text-purple-600" />
          Analytics & Insights
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg">
            <div className="text-2xl font-bold">{stats.avgAQI}</div>
            <div className="text-sm opacity-90">Weekly Average AQI</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-emerald-500 to-green-500 text-white rounded-lg">
            <div className="text-2xl font-bold">85%</div>
            <div className="text-sm opacity-90">Health Score</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-500 to-teal-500 text-white rounded-lg">
            <div className="text-2xl font-bold">15h</div>
            <div className="text-sm opacity-90">Pollution Avoided</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Weekly Air Quality Trend</h4>
          <div className="grid grid-cols-7 gap-2">
            {stats.weeklyData.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                <div className={`w-full h-16 rounded-lg ${getAQIColor(day.aqi)} flex items-center justify-center text-white font-bold text-sm`}>
                  {day.aqi}
                </div>
                <div className="text-xs text-gray-500 mt-1 capitalize">{day.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const RecommendationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Target className="w-6 h-6 mr-3 text-green-600" />
          Personal Recommendations
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-semibold text-green-800">Indoor Air Quality</span>
            </div>
            <p className="text-green-700 text-sm">Your air purifier usage is excellent! Continue using it during high pollution days.</p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
            <div className="flex items-center mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="font-semibold text-yellow-800">Exercise Timing</span>
            </div>
            <p className="text-yellow-700 text-sm">Consider exercising before 8 AM or after 7 PM when pollution levels are typically lower.</p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <div className="flex items-center mb-2">
              <Info className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-semibold text-blue-800">Health Management</span>
            </div>
            <p className="text-blue-700 text-sm">Given your asthma, consider carrying an N95 mask for days when AQI exceeds 100.</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Goals</h4>
          <div className="space-y-3">
            {profile.personalGoals.map((goal, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-3" />
                  <span className="text-gray-700">{goal}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">On Track</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Settings className="w-6 h-6 mr-3 text-gray-600" />
          Settings & Privacy
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Data & Privacy</h4>
            <div className="space-y-3">
              <CheckboxField
                label="Data Sharing"
                checked={profile.dataSharing}
                onChange={(e) => setProfile({...profile, dataSharing: e.target.checked})}
                description="Share anonymized data to improve air quality predictions"
              />
              <CheckboxField
                label="Research Participation"
                checked={profile.researchOptIn}
                onChange={(e) => setProfile({...profile, researchOptIn: e.target.checked})}
                description="Participate in air quality research studies"
              />
              <CheckboxField
                label="Auto Sync"
                checked={profile.autoSync}
                onChange={(e) => setProfile({...profile, autoSync: e.target.checked})}
                description="Automatically sync data across devices"
              />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h4>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-left">
                Export My Data
              </button>
              <button className="w-full p-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-left">
                Reset All Settings
              </button>
              <button className="w-full p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-left">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile': return <ProfileTab />;
      case 'health': return <HealthTab />;
      case 'monitoring': return <MonitoringTab />;
      case 'alerts': return <AlertsTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'recommendations': return <RecommendationsTab />;
      case 'settings': return <SettingsTab />;
      default: return <ProfileTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">AIRA Personal Profile</h1>
          <p className="text-gray-600">Manage your personalized air quality monitoring experience</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                    : 'bg-white/70 text-gray-700 hover:bg-white/90 hover:shadow-md'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AirQualityProfile;