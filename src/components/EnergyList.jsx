import { useAppStore } from "../store/useAppStore";
import EnergySourceItem from "./EnergySourceItem";

export default function EnergyList({ sources }) {
  const dk = useAppStore((s) => s.theme) === "dark";

  if (!sources || sources.length === 0) {
    return (
      <p className={`text-center text-sm py-8
        ${dk ? "text-gray-500" : "text-gray-400"}`}>
        Nessuna fonte disponibile
      </p>
    );
  }

  return (
    <div>
      {sources.map(s => (
        <EnergySourceItem
          key={s.id}
          name={s.name}
          icon={s.icon}
          value={s.value}
          unit={s.unit}
          type={s.type}
        />
      ))}
    </div>
  );
}
