"use client";

import { useFavorite } from "@/hooks/use-favorite";
import { useSearchHistory } from "@/hooks/use-search-history";
import { useLocationSearch } from "@/hooks/use-weather";
import { format } from "date-fns";
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { favorites } = useFavorite();
  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, clearHistory, addToHistory } = useSearchHistory();

  const handleSelect = (searchData: string) => {
    const [lat, lon, name, country] = searchData.split("|");

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    router.push(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        className="text-accent-foreground relative w-full justify-start text-sm sm:pr-12 md:w-40 lg:w-64"
        variant={"outline"}
        onClick={() => setOpen(true)}>
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search a city..."
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {favorites.length > 0 && (
            <CommandGroup heading="Favorites">
              {favorites.map((location) => {
                return (
                  <CommandItem
                    key={location.id}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}>
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-muted-foreground text-sm">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-muted-foreground text-sm">
                      , {location.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="my-2 flex items-center justify-between px-2">
                  <p>Recent Searches</p>
                  <Button
                    className="w-fit"
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => clearHistory.mutate()}>
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
                {history.map((location) => {
                  return (
                    <CommandItem
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}>
                      <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                      <span>{location.name}</span>
                      {location.state && (
                        <span className="text-muted-foreground text-sm">
                          , {location.state}
                        </span>
                      )}
                      <span className="text-muted-foreground text-sm">
                        , {location.country}
                      </span>
                      <span>
                        {format(location.searchedAt, "MMM d, h:mm a")}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}

          {locations && locations.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Suggestions">
                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                )}
                {locations?.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}>
                    <Search className="text-muted-foreground mr-2 h-4 w-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-muted-foreground text-sm">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-muted-foreground text-sm">
                      , {location.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
