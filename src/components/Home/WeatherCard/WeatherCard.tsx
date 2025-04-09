'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { WeatherData } from '@/components/Home/Hero/Hero';
import {
  WiHumidity,
  WiStrongWind,
  WiSunrise,
  WiSunset,
} from 'react-icons/wi';
import {
  FaTemperatureHigh,
  FaTemperatureLow,
  FaThermometerHalf,
} from 'react-icons/fa';

type Props = {
  data: WeatherData;
  loading: boolean;
  error: string | null;
};

const weatherBackgrounds: Record<string, string> = {
  Clear: 'bg-gradient-to-tr from-yellow-300 via-orange-400 to-pink-500',
  Clouds: 'bg-gradient-to-tr from-gray-400 via-slate-500 to-gray-700',
  Rain: 'bg-gradient-to-tr from-blue-500 via-indigo-700 to-gray-900',
  Thunderstorm: 'bg-gradient-to-tr from-purple-900 via-indigo-800 to-gray-900',
  Snow: 'bg-gradient-to-tr from-blue-100 via-white to-blue-300',
  Mist: 'bg-gradient-to-tr from-gray-300 via-gray-400 to-gray-500',
  Drizzle: 'bg-gradient-to-tr from-cyan-300 via-blue-400 to-indigo-500',
  Haze: 'bg-gradient-to-tr from-gray-200 via-gray-300 to-gray-400',
};

const WeatherCard = ({ data, loading, error }: Props) => {
  if (loading)
    return (
      <div className="text-center mt-8 text-blue-400 text-lg font-semibold">
        Loading weather data...
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-8 text-red-500 font-medium">{error}</div>
    );
  if (!data) return null;

  const {
    name,
    sys,
    main: { temp, humidity, feels_like, temp_min, temp_max },
    weather,
    wind: { speed },
  } = data;

  const condition = weather[0].main;
  const description = weather[0].description;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  const bg =
    weatherBackgrounds[condition] || 'bg-gradient-to-tr from-blue-300 to-indigo-500';

  const formatTime = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });

  const sunrise = sys?.sunrise ? formatTime(sys.sunrise) : 'N/A';
  const sunset = sys?.sunset ? formatTime(sys.sunset) : 'N/A';

  return (
    <motion.div
      className={`mt-10 flex justify-center`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`${bg} text-white w-[90%] sm:w-[80%] md:w-[60%] lg:w-[45%] p-6 rounded-3xl shadow-2xl relative overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-4xl font-extrabold">
              {name}
              {sys?.country && (
                <span className="ml-2 text-2xl font-semibold opacity-80">
                  , {sys.country}
                </span>
              )}
            </h2>
            <p className="capitalize text-lg font-medium">{description}</p>
          </div>
          <Image src={icon} alt={condition} width={80} height={80} className='hidden md:block'/>
        </div>

        {/* Main Temp and Feels Like */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-7xl font-bold">{Math.round(temp)}°C</h3>
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaThermometerHalf className="text-xl" />
            <span>Feels like {Math.round(feels_like)}°C</span>
          </div>
        </div>

        {/* Weather Stats in Two Rows with Justify Around */}
        <div className="text-sm font-medium px-2 space-y-4">
          <div className="flex justify-around items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
              <FaTemperatureHigh className="text-lg" />
              <span>Max: {Math.round(temp_max)}°C</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FaTemperatureLow className="text-lg" />
              <span>Min: {Math.round(temp_min)}°C</span>
            </div>
          </div>
          <div className="flex justify-around items-center flex-wrap gap-4">
            
            <div className="flex items-center gap-2">
              <WiHumidity className="text-2xl" />
              <span>Humidity: {humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <WiStrongWind className="text-2xl" />
              <span>Wind: {speed} km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <WiSunrise className="text-2xl" />
              <span>Sunrise: {sunrise}</span>
            </div>
            <div className="flex items-center gap-2">
              <WiSunset className="text-2xl" />
              <span>Sunset: {sunset}</span>
            </div>
          </div>
        </div>

        {/* Animated Glow */}
        <motion.div
          className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
};

export default WeatherCard;
