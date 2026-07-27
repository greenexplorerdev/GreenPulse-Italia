import { useCallback } from "react";
import useFetch from "../hooks/useFetch";
import weatherApi from "../services/weatherApi";

function SolarWidget({ latitude = 45.4654, longitude = 9.1859 }) {
  const fetchWeather = useCallback(
    (signal) => weatherApi(latitude, longitude)(signal),
    [latitude, longitude],
  );
  const { data, loading, error } = useFetch(fetchWeather);

  if (loading) {
    return (
      <p>
        Caricamento dati da API in corso...
        <span className="inline-block h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></span>
      </p>
    );
  }

  if (error) {
    return (
      <div className="mx-auto h-full w-full flex gap-4">
        <h2 className="text-center font-bold text-red-500">
          Errore nella chiamata API
        </h2>
        <p className="flex-items-center font-bold text-red-900">{error}</p>
        <p className="font-semibold text-red-700">
          si prega di cambiare url o riprovare
        </p>
      </div>
    );
  }

  if (
    !data ||
    !data.hourly ||
    !data.hourly.shortwave_radiation ||
    data.hourly.shortwave_radiation.length === 0
  ) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-500 rounded text-center">
        ⚠️ Nessun dato solare disponibile
      </div>
    );
  }

  const {
    latitude: latitudeApi,
    longitude: longitudeApi,
    hourly: { time, shortwave_radiation: shortwaveRadiation } = {},
  } = data ?? {};

  //logic buisness of max shortwave irradiation and time
  const pairsTime = time.map((t, i) => ({
    t,
    irr: shortwaveRadiation[i],
  }));

  const best = pairsTime.reduce((acc, cur) => (cur.irr > acc.irr ? cur : acc));
  //hours
  const oraMax = best.t.slice(11, 13);
  //max value
  const maxIrradiation = best.irr;

  return (
    <div className="mx-auto h-max w-full flex flex-col gap-2">
      <h2 className="text-center font-bold text-green-500">
        Dati Ricevuti con successo ✅
      </h2>
      <div className="flex flex-col mx-auto ">
        <p className=" text-center text-stone-500">
          la latitudine presa in considerazione è: {latitudeApi}
        </p>
        <p className=" text-center text-stone-500">
          la longitudine presa in considerazione è: {longitudeApi}
        </p>
        <p className="font-semibold text-emerald-700">
          Ore di irragiamento: {shortwaveRadiation.length}
        </p>
        <p className="font-semibold text-green-700">
          Ora di massimo irragiamento:
          {oraMax}
        </p>
        <p className="font-semibold text-green-700">
          Valore di massimo irraggiamento: {maxIrradiation}
        </p>
      </div>
    </div>
  );
}

export default SolarWidget;
