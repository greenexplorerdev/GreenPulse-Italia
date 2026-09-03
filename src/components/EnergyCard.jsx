import { useAppStore } from "../store/useAppStore";

export default function EnergyCard({ title, icon, unit, children }) {
  const dk = useAppStore((s) => s.theme) === "dark";
  return (
    <div className={`rounded-2xl p-4 border w-full h-full
      ${dk ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <div>
          <p className={`text-sm font-semibold ${dk ? "text-gray-200" : "text-gray-800"}`}>
            {title}
          </p>
          <p className={`text-xs ${dk ? "text-gray-500" : "text-gray-400"}`}>{unit}</p>
        </div>
      </div>
      <div className="text-center">
        {children}
      </div>
    </div>
  );
}
