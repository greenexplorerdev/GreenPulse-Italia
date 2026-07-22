import EnergyCard from "../components/EnergyCard";
import EnergyIndicator from "../components/EnergyIndicator";
import {energySources} from "../data/energySources";
import EnergyList from "../components/EnergyList";
import CO2Indicator from "../components/CO2Indicator";

export default function Dashboard({ region }) {
  return (
    <div className="space-y-6 ">
      <h2 className="text-center font-bold text-xl text-cyan-400">
        Dashboard Energetica - {region}
      </h2>
      <div className="space-y-4 flex gap-20">
        <EnergyCard title="Solare" icon="☀️ " unit="W/m²">
          <EnergyIndicator value={320} />
        </EnergyCard>

        <EnergyCard title="Eolico" icon="💨" unit="km/h">
          Vento medio: 18 km/h
        </EnergyCard>

        <EnergyCard title="Idro" icon="💧" unit="m³/s">
          Portata: 142 m³/s
        </EnergyCard>
      </div>
      <EnergyList sources={energySources} />
      <CO2Indicator value={210} />
    </div>
  );
}
