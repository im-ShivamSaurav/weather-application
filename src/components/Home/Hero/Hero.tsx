'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/Home/SearchBar/SearchBar';
import RecentSearches from '@/components/Home/RecentSearch/RecentSearch';
import WeatherCard from '@/components/Home/WeatherCard/WeatherCard';
import Loader from '@/components/ui/loader';
import DayForecast from '@/components/Home/ForeCast/DayForecast';
import HourForecast from '@/components/Home/ForeCast/HourForecast';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY as string;

export interface WeatherData {
  name: string;
  sys?: {
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  coord?: {
    lon: number;
    lat: number;
  };
}

interface HourlyForecastData {
  dt: number;
  temp: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

interface DailyForecastData {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

interface ForecastListItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

const Hero = () => {
  const [recentCities, setRecentCities] = useState<WeatherData[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [forecast, setForecast] = useState<{
    hourly: HourlyForecastData[];
    daily: DailyForecastData[];
  }>({ hourly: [], daily: [] });

  const fetchForecast = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (res.ok) {
        const list = data.list as ForecastListItem[];

        const hourlyData: HourlyForecastData[] = list.slice(0, 12).map((item) => ({
          dt: item.dt,
          temp: item.main.temp,
          weather: item.weather,
        }));

        const dailyData: DailyForecastData[] = list
          .filter((_, index) => index % 8 === 0)
          .slice(0, 5)
          .map((item) => ({
            dt: item.dt,
            temp: {
              day: item.main.temp,
              min: item.main.temp - 2,
              max: item.main.temp + 2,
            },
            weather: item.weather,
          }));

        setForecast({ hourly: hourlyData, daily: dailyData });
      }
    } catch (err) {
      console.error('Failed to fetch forecast data', err);
    }
  };

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (!res.ok || data.cod !== 200) {
        throw new Error(data.message || 'City not found');
      }

      setWeatherData(data);
      setRecentCities((prev) => {
        const filtered = prev.filter(
          (c) => c.name.toLowerCase() !== data.name.toLowerCase()
        );
        return [data, ...filtered].slice(0, 10);
      });
      fetchForecast(data.name);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to fetch weather data');
      } else {
        setError('An unknown error occurred');
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (cityName: string) => {
    setRecentCities((prev) =>
      prev.filter((c) => c.name.toLowerCase() !== cityName.toLowerCase())
    );
  };

  const handleSelect = (data: WeatherData) => {
    setQuery(data.name);
    setWeatherData(data);
    if (data.name) {
      fetchForecast(data.name);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLoading(true);
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const data = await res.json();
          if (res.ok && data.cod === 200) {
            setWeatherData(data);
            setRecentCities((prev) => [data, ...prev].slice(0, 10));
            fetchForecast(data.name);
          }
        } catch (err) {
          console.error('Failed to fetch weather for current location', err);
        } finally {
          setLoading(false);
        }
      });
    }
  }, []);

  return (
    <div>
      <SearchBar onSearch={handleSearch} query={query} setQuery={setQuery} />

      {loading && <Loader />}

      {weatherData && (
        <>
          <WeatherCard
            data={{
              ...weatherData,
              sys: weatherData.sys || { country: undefined },
            }}
            loading={loading}
            error={error}
          />
          <RecentSearches
            recent={recentCities}
            onRemove={handleRemove}
            onSelect={handleSelect}
          />

          <div className="mt-6 px-4 mb-8 md:px-6">
            <h2 className="text-5xl font-semibold mb-6 text-blue-400 px-12 transition-all duration-500 scroll-smooth" id='more'>
              More in {weatherData.name} ....
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-12">
              <HourForecast data={forecast.hourly} />
              <DayForecast data={forecast.daily} />
            </div>
          </div>
        </>
      )}

      {!weatherData && error && (
        <p className="text-center text-red-500 mt-4">{error}</p>
      )}
    </div>
  );
};

export default Hero;
