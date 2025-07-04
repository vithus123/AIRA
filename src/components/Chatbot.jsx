import React, { useContext } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { AirDataContext } from '../App';

const Chatbot = () => {
  const { airData, chatOpen, setChatOpen, chatMessages, setChatMessages, newMessage, setNewMessage } = useContext(AirDataContext);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, { type: 'user', message: newMessage }]);
      setTimeout(() => {
        const responses = [
          `Based on current Colombo air quality data, PM2.5 levels are at ${Math.round(airData.pm25)} μg/m³. This is considered moderate. I recommend limiting outdoor activities if you're sensitive to air pollution.`,
          `Air pollution in Colombo is primarily caused by vehicle emissions, industrial activities, and construction dust. Current AQI is ${Math.round(airData.aqi)}.`,
          "For better air quality, consider using air purifiers indoors, wearing N95 masks outdoors during high pollution days, and supporting green transportation initiatives.",
          `PM10 particles are larger than PM2.5 but still harmful. Current levels are ${Math.round(airData.pm10)} μg/m³. These particles can cause respiratory irritation.`
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setChatMessages(prev => [...prev, { type: 'bot', message: randomResponse }]);
      }, 1000);
      setNewMessage('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {chatOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 h-96 flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-green-400 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">AIRA Assistant</h3>
                <p className="text-xs opacity-80">Air pollution expert</p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl text-sm ${
                    msg.type === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about air quality..."
                className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setChatOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-green-400 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;