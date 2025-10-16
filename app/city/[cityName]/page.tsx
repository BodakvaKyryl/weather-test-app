"use client";

import { ForecastData, WeatherData } from "@/api/types";
import CurrentWeather from "@/components/current-weather";
import FavoriteButton from "@/components/favorite-button";
import HourlyTemperature from "@/components/hourly-temperature";
import LoadingSkeleton from "@/components/loading-skeleton";
import { StatusMessage } from "@/components/status-message";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertCircle } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

const CityPage = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  const coordinates = { lat, lon };
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const handleRefresh = () => {
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
    }
  };

  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherIsLoading,
  } = weatherQuery;
  const {
    data: forecastData,
    error: forecastError,
    isLoading: forecastIsLoading,
  } = forecastQuery;

  if (weatherError || forecastError) {
    return (
      <StatusMessage
        icon={AlertCircle}
        title="Error"
        description="Failed to fetch weather data. Please try again."
        buttonText="Retry"
        onButtonClick={handleRefresh}
      />
    );
  }

  if (weatherIsLoading || forecastIsLoading || !params.cityName) {
    return <LoadingSkeleton />;
  }

  if (!weatherData || !forecastData) {
    return (
      <StatusMessage
        icon={AlertCircle}
        title="Error"
        description="Weather data not available. Please try again."
        buttonText="Retry"
        onButtonClick={handleRefresh}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data?.sys.country}
        </h1>
        <div>
          <FavoriteButton
            data={{
              ...(weatherQuery.data as WeatherData),
              name: Array.isArray(params.cityName)
                ? params.cityName[0]
                : params.cityName,
            }}
          />
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <CurrentWeather data={weatherData as WeatherData} />
          <HourlyTemperature data={forecastData} />
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <WeatherDetails data={weatherData} />
          <WeatherForecast data={forecastQuery.data as ForecastData} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;
