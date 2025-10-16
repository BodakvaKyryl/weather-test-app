"use client";

import { ForecastData } from "@/api/types";
import { format } from "date-fns";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today&apos;s Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart width={400} height={400} data={chartData}>
              <XAxis
                dataKey={"time"}
                stroke="#d4d4d4"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className=""
              />
              <YAxis
                stroke="#d4d4d4"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
                capHeight={0}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="supports-[backdrop-filter]:bg-background/30 bg-background/95 rounded-lg border p-2 shadow-sm backdrop-blur-md">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col items-center">
                            <span className="text-muted-foreground text-[0.70rem] uppercase">
                              Temperature
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-muted-foreground text-[0.70rem] uppercase">
                              Feels like
                            </span>
                            <span className="font-bold">
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }}
              />
              <Line
                type={"monotone"}
                dataKey={"temp"}
                stroke="#525252"
                strokeWidth={2}
              />
              <Line
                type={"monotone"}
                dataKey={"feels_like"}
                stroke="#3a81f6"
                strokeWidth={2}
                strokeDasharray={"5 5"}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
