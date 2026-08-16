import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { italianCities } from "../data/italianCities";
import { ACTION, useDashboard } from "../context/DashboardContext";

export default function CityAutoComplete() {
  const [query, setQuery] = useState("");
  const { state, dispatch } = useDashboard();

  // Helper to get city names for filtering/display
  const cityNames = italianCities.map((c) => c.name);

  const filteredCities = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return cityNames
      .filter((name) => name.toLowerCase().includes(lowerQuery))
      .filter((name) => name !== state.selectedCity);
  }, [query, state.selectedCity]);

  const handleSelect = useCallback(
    (cityName) => {
      setQuery(cityName); // show selected city in input
      dispatch({
        type: ACTION.SET_CITY,
        payload: cityName,
      });
    },
    [dispatch],
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
      <input
        type="text"
        placeholder={
          state.selectedCity
            ? `Modifica città per ${state.selectedCity}`
            : "Cerca città..."
        }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 text-sm md:text-base border border-gray-200 rounded-lg"
        autoComplete="off"
        ref={inputRef}
      />

      {query.length > 0 && filteredCities.length > 0 && (
        <ul className="absolute top-full left-0 right-0 m-0 p-0 list-none bg-white border border-solid max-h-48 overflow-y-auto z-auto">
          {filteredCities.map((cityName) => (
            <li
              key={cityName}
              className="p-8 cursor-pointer hover:bg-green-500"
              onClick={() => handleSelect(cityName)}
            >
              {cityName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
