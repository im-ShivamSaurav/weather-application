import React from 'react';
import { format } from 'date-fns';
import Image from 'next/image';

type DailyForecastProps = {
  data: {
    dt: number;
    temp: { min: number; max: number };
    weather: { main: string; icon: string }[];
  }[];
};

const DayForecast = ({ data }: DailyForecastProps) => {
  return (
    <div className="rounded-2xl p-4 bg-white/20 dark:bg-white/10 backdrop-blur-md shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-blue-400">7-Day Forecast</h3>
      <div className="grid grid-cols-1 gap-4">
        {data.map((day, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 rounded-xl bg-blue-200/60 dark:bg-blue-300/30 shadow-inner hover:shadow-md transition"
          >
            <span className="font-medium text-gray-900 dark:text-white">
              {format(new Date(day.dt * 1000), 'EEE')}
            </span>
            <Image
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].main}
              className="w-8 h-8"
              width={32}
              height={32}
            />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayForecast;
