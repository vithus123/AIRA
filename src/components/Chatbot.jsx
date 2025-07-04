import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Wind, User, Maximize2, Minimize2, RotateCcw } from 'lucide-react';

const Chatbot = () => {
  // Mock air data for demonstration - replace with your actual data source
  const [airData] = useState({
    aqi: 125,
    pm25: 45,
    pm10: 68,
    location: 'Colombo'
  });
  
  // Chat state management
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [quickActions, setQuickActions] = useState([]);
  const messagesEndRef = useRef(null);

  // Initialize quick actions based on air quality
  useEffect(() => {
    const aqi = Math.round(airData.aqi);
    const actions = [];
    
    if (aqi > 150) {
      actions.push("🚨 Emergency recommendations");
      actions.push("😷 Mask recommendations");
    } else if (aqi > 100) {
      actions.push("⚠️ Health precautions");
      actions.push("🏠 Indoor air tips");
    } else {
      actions.push("🌱 Air quality trends");
      actions.push("💡 Prevention tips");
    }
    
    actions.push("📊 Detailed AQI breakdown");
    actions.push("🗺️ Area comparison");
    setQuickActions(actions);
  }, [airData]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return { status: 'Good', color: 'text-emerald-600', bgColor: 'bg-emerald-100' };
    if (aqi <= 100) return { status: 'Moderate', color: 'text-teal-600', bgColor: 'bg-teal-100' };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive', color: 'text-cyan-600', bgColor: 'bg-cyan-100' };
    if (aqi <= 200) return { status: 'Unhealthy', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (aqi <= 300) return { status: 'Very Unhealthy', color: 'text-indigo-600', bgColor: 'bg-indigo-100' };
    return { status: 'Hazardous', color: 'text-slate-600', bgColor: 'bg-slate-100' };
  };

  const generateEnhancedResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    const aqi = Math.round(airData.aqi);
    const pm25 = Math.round(airData.pm25);
    const pm10 = Math.round(airData.pm10);
    const aqiStatus = getAQIStatus(aqi);

    // Enhanced response logic for future AI model integration
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
      return `🚨 **EMERGENCY ALERT** - Current AQI: ${aqi} (${aqiStatus.status})\n\n**Immediate Actions:**\n• Stay indoors with windows closed\n• Use air purifiers if available\n• Avoid outdoor exercise completely\n• Consider N95/P2 masks for essential outdoor activities\n• Monitor symptoms: difficulty breathing, chest pain, persistent cough`;
    }

    if (lowerMessage.includes('mask') || lowerMessage.includes('protection')) {
      return `😷 **Mask Recommendations** (AQI: ${aqi})\n\n**Best Options:**\n• N95/P2 masks - 95% filtration efficiency\n• KN95 masks - Good alternative\n• Surgical masks - Basic protection only\n\n**Usage Tips:**\n• Ensure proper fit around nose and mouth\n• Replace every 8 hours of use\n• Don't touch the front surface`;
    }

    if (lowerMessage.includes('health') || lowerMessage.includes('symptoms')) {
      return `⚕️ **Health Impact Analysis** (AQI: ${aqi})\n\n**Current Risk Level:** ${aqiStatus.status}\n**PM2.5:** ${pm25} μg/m³\n**PM10:** ${pm10} μg/m³\n\n**Potential Symptoms:**\n• Respiratory irritation\n• Eye and throat discomfort\n• Reduced lung function\n• Increased asthma attacks\n\n**Vulnerable Groups:** Children, elderly, pregnant women, people with respiratory conditions`;
    }

    if (lowerMessage.includes('indoor') || lowerMessage.includes('home')) {
      return `🏠 **Indoor Air Quality Tips**\n\n**Immediate Actions:**\n• Close all windows and doors\n• Use HEPA air purifiers\n• Avoid cooking with gas stoves\n• No smoking indoors\n• Use exhaust fans when cooking\n\n**Long-term Solutions:**\n• Install air filtration systems\n• Use houseplants (spider plants, peace lilies)\n• Regular HVAC maintenance`;
    }

    if (lowerMessage.includes('trends') || lowerMessage.includes('forecast')) {
      return `📈 **Air Quality Trends & Forecast**\n\n**Current Status:** ${aqiStatus.status} (AQI: ${aqi})\n**24h Trend:** ${Math.random() > 0.5 ? 'Improving' : 'Worsening'}\n**Tomorrow's Forecast:** ${Math.random() > 0.5 ? 'Better' : 'Similar'} conditions expected\n\n**Factors Affecting Quality:**\n• Wind speed: ${Math.random() > 0.5 ? 'Low' : 'Moderate'}\n• Temperature inversion: ${Math.random() > 0.5 ? 'Present' : 'Absent'}\n• Traffic patterns: Peak hours impact`;
    }

    if (lowerMessage.includes('breakdown') || lowerMessage.includes('detailed')) {
      return `📊 **Detailed AQI Breakdown**\n\n**Overall AQI:** ${aqi} (${aqiStatus.status})\n**PM2.5:** ${pm25} μg/m³ ${pm25 > 35 ? '⚠️ Above WHO guidelines' : '✅ Within limits'}\n**PM10:** ${pm10} μg/m³ ${pm10 > 50 ? '⚠️ Above WHO guidelines' : '✅ Within limits'}\n\n**Health Impact:**\n• Respiratory system: ${aqi > 100 ? 'High risk' : 'Moderate risk'}\n• Cardiovascular: ${aqi > 150 ? 'High risk' : 'Low risk'}\n• Visibility: ${aqi > 100 ? 'Reduced' : 'Good'}`;
    }

    if (lowerMessage.includes('comparison') || lowerMessage.includes('area')) {
      return `🗺️ **Area Comparison**\n\n**Colombo Central:** AQI ${aqi}\n**Colombo North:** AQI ${aqi + Math.floor(Math.random() * 20 - 10)}\n**Colombo South:** AQI ${aqi + Math.floor(Math.random() * 20 - 10)}\n**Suburban areas:** Generally ${Math.random() > 0.5 ? 'better' : 'similar'} (AQI ${aqi - Math.floor(Math.random() * 30)})\n\n**Best nearby areas:**\n• Coastal regions (sea breeze effect)\n• Parks and green spaces\n• Less traffic-congested areas`;
    }

    if (lowerMessage.includes('prevention') || lowerMessage.includes('tips')) {
      return `💡 **Prevention & Mitigation Tips**\n\n**Personal Actions:**\n• Use public transport or electric vehicles\n• Plant trees and maintain gardens\n• Avoid burning waste\n• Choose eco-friendly products\n\n**Community Initiatives:**\n• Support clean energy projects\n• Participate in tree-planting drives\n• Advocate for better public transport\n• Report illegal burning or pollution`;
    }

    // Default enhanced response
    const responses = [
      `🔍 **Current Air Quality Status**\n\n**AQI:** ${aqi} (${aqiStatus.status})\n**PM2.5:** ${pm25} μg/m³\n**PM10:** ${pm10} μg/m³\n\n**Recommendation:** ${aqi > 100 ? 'Limit outdoor activities, especially for sensitive individuals' : 'Air quality is acceptable for most activities'}\n\n**Next Check:** Monitor conditions every 2-3 hours`,
      
      `🌬️ **Pollution Sources in Colombo**\n\n**Primary Contributors:**\n• Vehicle emissions (40-50%)\n• Industrial activities (20-30%)\n• Construction dust (15-20%)\n• Biomass burning (10-15%)\n\n**Current AQI:** ${aqi}\n**Status:** ${aqiStatus.status}\n\n**Peak pollution times:** 7-9 AM, 6-8 PM`,
      
      `🏥 **Health Recommendations**\n\n**For Current AQI (${aqi}):**\n${aqi > 150 ? '• Avoid all outdoor activities\n• Use air purifiers indoors\n• Wear N95 masks if going outside' : aqi > 100 ? '• Reduce prolonged outdoor activities\n• Consider masks for sensitive individuals\n• Monitor symptoms closely' : '• Normal activities generally safe\n• Sensitive individuals should still be cautious\n• Good time for outdoor exercise'}\n\n**Emergency contacts:** 1990 (Ambulance), 119 (Emergency)`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage = newMessage.trim();
      setChatMessages(prev => [...prev, { type: 'user', message: userMessage, timestamp: new Date() }]);
      setNewMessage('');
      setIsTyping(true);

      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = generateEnhancedResponse(userMessage);
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        message: response, 
        timestamp: new Date(),
        confidence: Math.random() * 0.3 + 0.7 // Simulate AI confidence score
      }]);
      setIsTyping(false);

      // Save to history for future AI training
      setChatHistory(prev => [...prev, { query: userMessage, response, timestamp: new Date() }]);
    }
  };

  const handleQuickAction = (action) => {
    setNewMessage(action.replace(/[🚨⚠️🌱💡📊🗺️😷🏠]/g, '').trim());
    sendMessage();
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const aqiStatus = getAQIStatus(Math.round(airData.aqi));

  return (
    <div className={`fixed ${isFullscreen ? 'inset-4' : 'bottom-6 right-6'} z-50`}>
      {chatOpen ? (
        <div className={`bg-white rounded-2xl shadow-2xl ${isFullscreen ? 'w-full h-full' : 'w-96 h-[32rem]'} flex flex-col transition-all duration-300`}>
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-400  text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Wind className="w-5 h-5" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">AIRA Assistant</h3>
                  <p className="text-xs opacity-90">AI-Powered Air Quality Expert</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={clearChat}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Live AQI Status */}
            <div className="mt-3 flex items-center space-x-4 text-sm">
              <div className={`px-3 py-1 rounded-full bg-white bg-opacity-20 text-white font-medium`}>
                AQI: {Math.round(airData.aqi)} - {aqiStatus.status}
              </div>
              <div className="flex items-center space-x-1">
                <Wind className="w-4 h-4" />
                <span>PM2.5: {Math.round(airData.pm25)}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-b bg-gradient-to-r from-cyan-50 to-teal-50">
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className="px-3 py-1 text-xs bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Wind className="w-12 h-12 mx-auto mb-3 text-teal-400" />
                <p className="text-sm">Hi! I'm AIRA, your AI air quality assistant.</p>
                <p className="text-xs mt-1">Ask me anything about air pollution, health impacts, or protection measures.</p>
              </div>
            )}
            
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {msg.type === 'user' ? (
                      <User className="w-4 h-4 text-teal-600" />
                    ) : (
                      <Wind className="w-4 h-4 text-emerald-600" />
                    )}
                    <span className="text-xs text-gray-500">
                      {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.confidence && (
                      <span className="text-xs text-gray-400">
                        ({Math.round(msg.confidence * 100)}% confident)
                      </span>
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-sm ${
                      msg.type === 'user' 
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-br-md' 
                        : 'bg-gradient-to-r from-gray-50 to-teal-50 text-gray-800 rounded-bl-md border border-teal-100'
                    }`}
                  >
                    {msg.type === 'bot' ? (
                      <div className="whitespace-pre-line">
                        {msg.message.split('\n').map((line, i) => (
                          <div key={i} className={line.startsWith('**') ? 'font-semibold' : ''}>
                            {line.replace(/\*\*/g, '')}
                          </div>
                        ))}
                      </div>
                    ) : (
                      msg.message
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-gray-50 to-teal-50 p-3 rounded-2xl rounded-bl-md border border-teal-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input */}
          <div className="p-4 border-t bg-gradient-to-r from-cyan-50 to-teal-50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isTyping && sendMessage()}
                placeholder="Ask about air quality, health tips, or protection..."
                className="flex-1 px-4 py-2 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={isTyping || !newMessage.trim()}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-2 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Powered by AIRA AI • {chatHistory.length} conversations</span>
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => setChatOpen(true)}
            className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-400  text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 animate-pulse flex items-center justify-center"
          >
            
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;