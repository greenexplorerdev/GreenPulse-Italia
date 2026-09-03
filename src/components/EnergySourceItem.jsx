import { memo } from "react";
import { useAppStore } from "../store/useAppStore";

const EnergySourceItem = memo(function EnergySourceItem({ name, icon, value, unit, type }) {
  const dk = useAppStore((s) => s.theme) === "dark";
  return (
    <div className={`flex items-center justify-between px-4 py-3 border-b last:border-0
      transition-colors duration-150
      ${dk
        ? "border-gray-800 hover:bg-gray-800"
        : "border-gray-50 hover:bg-gray-50"}`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <div>
          <p className={`text-sm font-medium ${dk ? "text-gray-200" : "text-gray-800"}`}>
            {name}
          </p>
          <p className={`text-xs ${dk ? "text-gray-500" : "text-gray-400"}`}>
            {value} {unit}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs
          ${type === "renewable" ? "text-emerald-500" : "text-orange-500"}`}>
          {type === "renewable" ? "rinnovabile" : "fossile"}
        </span>
        <div className={`w-2.5 h-2.5 rounded-full
          ${type === "renewable" ? "bg-emerald-500" : "bg-orange-500"}`}
          aria-label={type === "renewable" ? "Rinnovabile" : "Fossile"} />
      </div>
    </div>
  );
});

export default EnergySourceItem;
