"use client";

import { Coordinates } from "@/api/types";
import { AlertCircle } from "lucide-react";
import LoadingSkeleton from "./loading-skeleton";
import { StatusMessage } from "./status-message";

interface LocationStatusMessageProps {
  isLoading: boolean;
  error: string | null;
  coordinates: Coordinates | null;
  getLocation: () => void;
}

export function LocationStatusMessage({
  isLoading,
  error,
  coordinates,
  getLocation,
}: LocationStatusMessageProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <StatusMessage
        icon={AlertCircle}
        title="Location Error"
        description={error}
        buttonText="Enable Location"
        onButtonClick={getLocation}
      />
    );
  }

  if (!coordinates) {
    return (
      <StatusMessage
        icon={AlertCircle}
        title="Location Required"
        description="Please enable location access to see your local weather."
        buttonText="Enable Location"
        onButtonClick={getLocation}
      />
    );
  }

  return null;
}
