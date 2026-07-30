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
      <h2>Dettaglio Energetico: {regionId}</h2>
      <p>
        qui sono rappresentati i dettagli energetici degli impianti della
        regione
      </p>
    </div>
  );
}
