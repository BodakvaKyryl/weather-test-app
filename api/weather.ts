import { API_CONFIG } from "./config";
import {
  Coordinates,
  ForecastData,
  GeocodingResponse,
  WeatherData,
} from "./types";

class WeatherAPI {
  private async proxyFetch<T>(
    params: Record<string, string | number>
  ): Promise<T> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      searchParams.set(k, String(v));
    });

    const url = `/api/weather?${searchParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      let msg = response.statusText || "Unknown error";
      try {
        const parsed = JSON.parse(text);
        if (parsed && parsed.message) msg = parsed.message;
      } catch {}
      throw new Error(`Weather API Error: ${msg}`);
    }

    return response.json() as Promise<T>;
  }

  async getCurrentWether({ lat, lon }: Coordinates): Promise<WeatherData> {
    return this.proxyFetch<WeatherData>({
      type: "current",
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });
  }

  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    return this.proxyFetch<ForecastData>({
      type: "forecast",
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });
  }

  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<GeocodingResponse[]> {
    return this.proxyFetch<GeocodingResponse[]>({
      type: "reverse",
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    });
  }

  async searchLocations(query: string): Promise<GeocodingResponse[]> {
    return this.proxyFetch<GeocodingResponse[]>({
      type: "search",
      q: query,
      limit: 5,
    });
  }
}

export const weatherAPI = new WeatherAPI();
