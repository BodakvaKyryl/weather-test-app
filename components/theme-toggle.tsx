import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Button } from "./ui/button";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {}, [theme]);

  const handleToggle = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
  };

  return (
    <Button
      onClick={handleToggle}
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      className="relative overflow-hidden">
      <Sun
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isDark ? "scale-100 rotate-0 text-yellow-500" : "scale-0 -rotate-90 text-yellow-500"}`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isDark ? "scale-0 rotate-90 text-blue-500" : "scale-100 rotate-0 text-blue-500"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeToggle;
