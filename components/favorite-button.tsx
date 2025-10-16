import { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/use-favorite";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
interface FavoriteButtonProps {
  data: WeatherData;
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {
  const { addToFavorite, isFavorite, removeFavorites } = useFavorite();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);
  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorites.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addToFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };

  return (
    <Button
      className={
        isCurrentlyFavorite ? "bg-yellow-500 hover:bg-orange-500" : "ng"
      }
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size={"icon"}
      onClick={handleToggleFavorite}>
      <Star
        className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
      />
    </Button>
  );
};

export default FavoriteButton;
