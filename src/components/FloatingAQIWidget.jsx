import React, { useContext } from 'react';
import { AirDataContext } from '../App';

const FloatingAQIWidget = () => {
  const { airData, getAQIColor, getAQIStatus } = useContext(AirDataContext);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="bg-white rounded-2xl shadow-lg p-4 border-l-4 border-blue-500">
        <div className="flex items-center space-x-3">
          <div className={`text-2xl font-bold ${getAQIColor(airData.aqi)}`}>
            {Math.round(airData.aqi)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">AQI Now</p>
            <p className="text-xs text-gray-600">{getAQIStatus(airData.aqi)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingAQIWidget;