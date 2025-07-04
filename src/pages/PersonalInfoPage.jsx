import React from 'react';

const PersonalInfoPage = ({ profile, setProfile, isEditing, setIsEditing }) => {
  const handleEditSave = () => {
    if (isEditing) {
      // Save action
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-green-400 rounded-full blur-3xl"></div>
      </div>

      {/* Air Quality Facts Background */}
      <div className="absolute top-16 left-4 max-w-xs bg-gradient-to-br from-blue-400/20 to-teal-500/20 backdrop-blur-lg rounded-2xl p-5 border border-blue-300/30 shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-3 rounded-full shadow-lg">
            <div className="text-2xl">💨</div>
          </div>
          <div>
            <h5 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-700 text-sm mb-2">Global Impact</h5>
            <p className="text-sm text-blue-800 leading-relaxed font-medium">Air pollution causes <span className="font-bold text-teal-700">7 million</span> premature deaths annually worldwide</p>
          </div>
        </div>
      </div>
      
      <div className="absolute top-16 right-4 max-w-xs bg-gradient-to-br from-teal-400/20 to-green-500/20 backdrop-blur-lg rounded-2xl p-5 border border-teal-300/30 shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-r from-teal-500 to-green-500 p-3 rounded-full shadow-lg">
            <div className="text-2xl">🌱</div>
          </div>
          <div>
            <h5 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-green-700 text-sm mb-2">Indoor Air Quality</h5>
            <p className="text-sm text-teal-800 leading-relaxed font-medium">Indoor air can be <span className="font-bold text-green-700">5x more polluted</span> than outdoor air</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto py-8 px-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              Personal Information
            </h3>
            <button
              onClick={handleEditSave}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all shadow-lg"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profile?.fullName || ''}
                onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={profile?.username || ''}
                onChange={e => setProfile({ ...profile, username: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profile?.email || ''}
                onChange={e => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={profile?.phone || ''}
                onChange={e => setProfile({ ...profile, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">🌍 Clean Air Initiative</h4>
            <p className="text-blue-100">Together we can make a difference in air quality monitoring and improvement</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm">
            <span>© 2025 Air Quality Profile</span>
            <span className="hidden md:inline">|</span>
            <span>Protecting our environment, one breath at a time</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PersonalInfoPage;