
// Componente con 5 pulsanti — uno per città.
// Al click: dispatch SET_CITY con l'oggetto città completo (nome + coordinate + regione).
// Il pulsante della città attiva è evidenziato in verde.


import { CITIES } from "../data/cities";
import { useDashboard } from "../context/DashboardContext";
import { ACTION } from "../context/ActionTypes";

export default function CitySelector() {
  const { state, dispatch } = useDashboard();

  function handleCitySelect(city) {
    dispatch({ type: ACTION.SET_CITY, payload: city });
  }

  return (
    <div className="w-full">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium uppercase tracking-wide">
        Seleziona città
      </p>

      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {CITIES.map((city) => {
          const isActive = state.selectedCity?.id === city.id;

          return (
            <button
              key={city.id}
              onClick={() => handleCitySelect(city)}
              className={`
                flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium
                transition-all duration-200 border
                ${
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-105"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                }
              `}
              aria-pressed={isActive}
              aria-label={`Seleziona ${city.name}, ${city.region}`}
            >
              <span aria-hidden="true">{city.emoji}</span>
              <span>{city.name}</span>
            </button>
          );
        })}
      </div>

      {/* Mostra la regione associata alla città attiva */}
      {state.selectedCity && (
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          Regione: {state.selectedCity.region}
        </p>
      )}
    </div>
  );
}
