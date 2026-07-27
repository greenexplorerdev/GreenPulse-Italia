import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { italianCities } from "../data/italianCities";

export default function CityAutoComplete({ onCitySelect }) {
  const [query, setQuery] = useState("");

  const filteredCities = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return italianCities.filter((city) =>
      city.toLowerCase().includes(lowerQuery),
    );
  }, [query]);

  const handleSelect = useCallback(
    (city) => {
      setQuery(city); // opzionale: mostra la città selezionata nell'input
      onCitySelect(city);
    },
    [onCitySelect],
  );

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Input controllato */}
      <input
        type="text"
        placeholder="Cerca città..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-8 text-base box-border"
        autoComplete="off"
        ref={inputRef}
      />

      {/* Dropdown delle suggerimenti (visibile solo se c'è query e risultati) */}
      {query.length > 0 && filteredCities.length > 0 && (
        <ul className="absolute top-full left-0 right-0 m-0 p-0 list-none bg-white border border-solid max-h-48 overflow-y-auto z-auto">
          {filteredCities.map((city) => (
            <li
              key={city}
              className="p-8 cursor-pointer hover:bg-green-500"
              onClick={() => handleSelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
