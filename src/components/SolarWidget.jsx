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
    const {
      latitude: latitude,
      longitude: longitude,
      hourly: { time, shortwave_radiation: shortwaveRadiation } = {},
    } = data ?? {};

    //logic buisness of max shortwave irradiation and time
    const pairsTime = time.map((t, i) => ({
      t,
      irr: shortwaveRadiation[i],
    }));

    const best = pairsTime.reduce((acc, cur) =>
      cur.irr > acc.irr ? cur : acc,
    );
    //hours
    const oraMax = best.t.slice(11, 13);
    //max value
    const maxIrradiation = best.irr;

    return (
    
        <div className="mx-auto h-max w-full flex flex-col gap-4">
          <h2 className="text-center font-bold text-green-500">
            Dati Ricevuti con successo ✅
          </h2>
          <div className="flex flex-col mx-auto">
            <p className=" text-center text-stone-200">
              la latitudine presa in considerazione è: {latitude}
            </p>
            <p className=" text-center text-stone-200">
              la longitudine presa in considerazione è: {longitude}
            </p>
          </div>
          <p className="font-semibold text-yellow-700">
            Ore di irragiamento: {shortwaveRadiation.length}
          </p>
          <p className="font-semibold text-yellow-700">
            Ora di massimo irragiamento:
            {oraMax}
          </p>
          <p className="font-semibold text-yellow-700">
            Valore di massimo irraggiamento: {maxIrradiation}
          </p>
        </div>
    
    );
  }
}

export default SolarWidget;
