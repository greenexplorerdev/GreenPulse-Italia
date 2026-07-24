export default function RegionSelector({ region, onRegionChange }) {
  return (
    <>
      <div className="w-full max-w-xs">
        <label
          htmlFor="region-select"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
         Seleziona una Regione
        </label>
        <select
          className="w-full px-4 py-3 text-base font-medium text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50  "
          name="regions's selected"
          id="selectedregion"
          value={region}
          onChange={(event) => onRegionChange(event.target.value)}
        >
          <option value="Lombardia">Lombardia</option>
          <option value="Piemonte">Piemonte</option>
          <option value="Veneto">Veneto</option>
          <option value="Emilia-Romagna">Emilia-Romagna</option>
          <option value="Toscana">Toscana</option>
          <option value="Trentino-Alto Adige">Trentino-Alto Adige</option>
          <option value="Friuli-Venezia Giulia">Friuli-Venezia Giulia</option>
        </select>
      </div>
    </>
  );
}
