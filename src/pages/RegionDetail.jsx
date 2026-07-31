import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDashboard, ACTION } from "../context/DashboardContext";

export default function RegionDetail() {
  const { regionId } = useParams();
  const { dispatch } = useDashboard();
  useEffect(() => {
    dispatch({ type: ACTION.SET_REGION, payload: regionId });
  }, [regionId, dispatch]);

  return (
    <div>
      <div className="mt-8 p-4 bg-green-50 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Impianti per {regionId}
        </h3>
        <p className="text-gray-600">
          Qui potrebbero essere mostrati dati specifici sugli impianti
          rinnovabili presenti nella regione selezionata.
        </p>
      </div>
    </div>
  );
}
