"use client";

import { LucideIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

interface StatusMessageProps {
  icon?: LucideIcon;
  title: string;
  description: string | React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  variant?: "default" | "destructive";
}

export function StatusMessage({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick,
  variant = "destructive",
}: StatusMessageProps) {
  return (
    <Alert variant={variant}>
      {Icon && <Icon className="h-4 w-4" />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        {description}
        {buttonText && onButtonClick && (
          <Button onClick={onButtonClick} variant={"outline"} className="w-fit">
            {buttonText}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
