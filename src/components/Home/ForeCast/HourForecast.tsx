import React from 'react';
import { format } from 'date-fns';
import Image from 'next/image';

type HourlyForecastProps = {
  data: {
    dt: number;
    temp: number;
    weather: { main: string; icon: string }[];
  }[];
};

const HourForecast = ({ data }: HourlyForecastProps) => {
  return (
    <div className="bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-4 w-full">
      <h3 className="text-lg font-semibold mb-4 text-blue-400">Hourly Forecast</h3>
      <div className="grid grid-cols-2 gap-4">
        {data.slice(0, 12).map((hour, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 rounded-xl bg-blue-200/60 dark:bg-blue-300/30 shadow-inner hover:shadow-md transition"
          >
            <span className="text-sm text-gray-900 dark:text-white">
              {format(new Date(hour.dt * 1000), 'hh a')}
            </span>
            <Image
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].main}
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {Math.round(hour.temp)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourForecast;
