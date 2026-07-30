import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { italianCities } from "../data/italianCities";
import { ACTION, useDashboard } from "../context/DashboardContext";

export default function CityAutoComplete() {
  const [query, setQuery] = useState("");
  const { state, dispatch } = useDashboard();

  const filteredCities = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return italianCities
      .filter((city) => city.toLowerCase().includes(lowerQuery))
      .filter((city) => city !== state.selectedCity);
  }, [query, state.selectedCity]);

  const handleSelect = useCallback((city) => {
    setQuery(city); // opzionale: mostra la città selezionata nell'input
    dispatch({
      type: ACTION.SET_CITY,
      payload: city,
    });
  }, [dispatch]);

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
        className="w-full p-8 text-base box-border"
        autoComplete="off"
        ref={inputRef}
      />

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
