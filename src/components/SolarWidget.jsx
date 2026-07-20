import { useEffect, useState } from "react";
import weatherApi from "../services/weatherApi";

function SolarWidget() {
  let latitude = 45.4654;
  let longitude = 9.1859;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await weatherApi(latitude, longitude);
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Errore Sconosciuto");
      }
    }
    loadData();
  }, [latitude, longitude]);

  if (loading) {
    return (
      <p>
        Caricamento dati da API in corso...{" "}
        <span className="inline-block h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></span>
      </p>
    );
  }

  if (error) {
    return (
      <div className="mx-auto h-full w-full flex">
        <h2 className="text-center font-bold text-red-500">
          Errore nella chiamata API
        </h2>
        <p className="flex-items-center">{error}</p>
        <p className="font-semibold text-red-700">
          si prega di cambiare url o riprovare
        </p>
      </div>
    );
  }

  if (data) {
    return (
      <div className="mx-auto h-full w-full">
        <h2 className="text-center font-bold text-green-500">
          Dati Ricevuti con successo ✅
        </h2>
        <p className="font-semibold text-emerald-700">
          {data.hourly.shortwave_radiation.length} ore`
        </p>
        <p className="text-smoke text-center">la latitudine presa in considerazione è: {latitude}</p>
        <p>la longitudine presa in considerazione è: {longitude}</p>
      </div>
    );
  }

  /* const {
      latitude,
      longitude
    } = data ?? {} */
}

export default SolarWidget;
