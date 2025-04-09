import React from 'react';
import MiniWeatherCard from '@/components/Helper/MiniWeatherCard';
import { WeatherData } from '@/components/Home/Hero/Hero';

interface Props {
  recent: WeatherData[];
  onRemove: (cityName: string) => void;
  onSelect: (data: WeatherData) => void;
}

const RecentSearches = ({ recent, onRemove, onSelect }: Props) => {
  if (!recent.length) return null;

  // Limit to one on small screens
  const recentMobile = recent.slice(0, 1);

  return (
    <div className="mt-8 pt-16 px-4 sm:px-20 md:px-32 md:py-18">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">
        Recent Searches
      </h2>

      <div className="flex flex-wrap gap-4">
        {/* Show only 1 on small screens */}
        <div className="block sm:hidden">
          {recentMobile.map((city) => (
            <MiniWeatherCard
              key={city.name}
              data={city}
              onRemove={onRemove}
              onSelect={onSelect}
            />
          ))}
        </div>

        {/* Show full list on screens sm and above */}
        <div className="hidden sm:flex flex-wrap gap-4">
          {recent.map((city) => (
            <MiniWeatherCard
              key={city.name}
              data={city}
              onRemove={onRemove}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSearches;
