"use client";

import { ForecastData, WeatherData } from "@/api/types";
import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import LoadingSkeleton from "@/components/loading-skeleton";
import { LocationStatusMessage } from "@/components/location-status-message";
import { StatusMessage } from "@/components/status-message";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import useGeolocation from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function WeatherDashboard() {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();

    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  const locationStatus = LocationStatusMessage({
    isLoading: locationLoading,
    error: locationError,
    coordinates: coordinates,
    getLocation: getLocation,
  });

  if (locationStatus) {
    return locationStatus;
  }

  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherIsLoading,
    isFetching: weatherIsFetching,
  } = weatherQuery;
  const {
    data: forecastData,
    error: forecastError,
    isLoading: forecastIsLoading,
    isFetching: forecastIsFetching,
  } = forecastQuery;
  const {
    data: locationData,
    error: locationQueryError,
    isLoading: locationQueryIsLoading,
    isFetching: locationQueryIsFetching,
  } = locationQuery;

  const locationName = locationData?.[0];

  if (weatherError || forecastError || locationQueryError) {
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

  if (weatherIsLoading || forecastIsLoading || locationQueryIsLoading) {
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
        <h1 className="text-xl font-bold tracking-tight">
          My Location {locationName?.name && `- ${locationName.name}`}
        </h1>
        <Button
          className=""
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={
            weatherIsFetching || forecastIsFetching || locationQueryIsFetching
          }>
          <RefreshCw
            className={`h-4 w-4 ${weatherIsFetching || forecastIsFetching || locationQueryIsFetching ? "animate-spin" : ""}`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <CurrentWeather
            data={weatherData as WeatherData}
            locationName={locationName}
          />
          <HourlyTemperature data={forecastData} />
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <WeatherDetails data={weatherData} />
          <WeatherForecast data={forecastQuery.data as ForecastData} />
        </div>
      </div>
    </div>
  );
}
