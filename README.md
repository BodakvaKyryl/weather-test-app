# Weather Test App

A modern, feature-rich weather application built with Next.js 13+ and React, providing real-time weather information with a beautiful and responsive user interface.

## Features

- **Real-time Weather Data**: Get current weather conditions including temperature, humidity, wind speed, and more
- **Location-based Weather**: Automatic weather detection based on user's location
- **City Search**: Search for weather information in any city worldwide
- **Favorites System**: Save and manage your favorite cities for quick access
- **Search History**: Keep track of your recent weather searches
- **5-Day Forecast**: View detailed weather forecasts for the next 5 days
- **Hourly Temperature**: Track temperature changes throughout the day
- **Detailed Weather Information**: Access comprehensive weather data including:
  - Temperature (current, feels like, min/max)
  - Humidity levels
  - Wind speed and direction
  - Sunrise and sunset times
  - Pressure
  - Visibility
  - Cloud coverage
  - Rain volume (when applicable)

## Technical Features

- Built with Next.js 13+ and React 19
- TypeScript for type safety
- TailwindCSS for styling
- Theme toggling (Light/Dark mode)
- Responsive design
- API integration with OpenWeatherMap
- Client-side caching with TanStack Query
- Modern UI components with shadcn/ui
- Beautiful data visualization with Recharts

## Screenshots

[Note: Add screenshots here showing:]

1. Main weather dashboard with current weather
2. City search functionality
3. 5-day forecast view
4. Favorites list
5. Theme toggle (light/dark mode)
6. Hourly temperature graph

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/weather-test-app.git
```

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

1. Create a `.env.local` file and add your OpenWeatherMap API key:

```env
NEXT_PUBLIC_API_KEY=your_api_key_here
```

1. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_API_KEY`: Your OpenWeatherMap API key
