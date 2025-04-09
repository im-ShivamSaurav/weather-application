import React from 'react';
import Image from 'next/image';
import { WeatherData } from '@/components/Home/Hero/Hero';
import { X } from 'lucide-react';

type MiniWeatherCardProps = {
  data: WeatherData;
  onRemove: (cityName: string) => void;
  onSelect: (data: WeatherData) => void;
};

const MiniWeatherCard = ({ data, onRemove, onSelect }: MiniWeatherCardProps) => {
  const {
    name,
    sys,
    main: { temp },
    weather,
  } = data;

  const condition = weather[0]?.main || 'Clear';
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div
      className={`
        backdrop-blur-md bg-white/30 dark:bg-white/10 border border-gray-300 dark:border-white/20 
        text-black dark:text-white w-full sm:w-64 min-w-[220px] h-40 p-4 rounded-2xl shadow-md 
        flex flex-col justify-between relative hover:scale-105 transition-transform cursor-pointer
      `}
      onClick={() => onSelect(data)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(name);
        }}
        className="absolute top-2 right-2 text-black/60 dark:text-white/60 hover:text-red-400"
        aria-label={`Remove ${name}`}
      >
        <X size={18} />
      </button>

      <div className="text-base sm:text-lg font-semibold">
        {name}{sys?.country && <span className="uppercase">, {sys.country}</span>}
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-xl sm:text-2xl font-bold">{Math.round(temp)}°C</span>
        <Image src={icon} alt={condition} width={48} height={48} />
      </div>
    </div>
  );
};

export default MiniWeatherCard;
