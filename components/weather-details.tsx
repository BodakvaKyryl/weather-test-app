import { WeatherData } from "@/api/types";
import { format } from "date-fns";
import {
  Clock,
  Cloud,
  CloudRainWind,
  Compass,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
    {
      title: "Visibility",
      value: `${data.visibility / 1000} km`,
      icon: Eye,
      color: "text-teal-500",
    },
    {
      title: "Cloudiness",
      value: `${data.clouds.all}%`,
      icon: Cloud,
      color: "text-gray-500",
    },
  ];

  if (data.rain?.["1h"]) {
    details.push({
      title: "Rain Volume (1h)",
      value: `${data.rain["1h"]} mm`,
      icon: CloudRainWind,
      color: "text-cyan-500",
    });
  }

  details.push({
    title: "Last Updated",
    value: formatTime(data.dt),
    icon: Clock,
    color: "text-indigo-500",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4">
              <detail.icon className={`h-5 w-5 ${detail.color}`} />
              <div>
                <p className="text-sm leading-none font-medium">
                  {detail.title}
                </p>
                <p className="text-muted-foreground text-sm">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
