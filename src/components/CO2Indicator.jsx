import { useAppStore } from "../store/useAppStore";

export default function CO2Indicator({ value }) {
  const dk = useAppStore((s) => s.theme) === "dark";

  const config = value < 100
    ? { label:"🟢 Energia pulita — Emissioni minime",    bg: dk ? "bg-emerald-950 border-emerald-900" : "bg-emerald-50 border-emerald-200", txt:"text-emerald-600 dark:text-emerald-400" }
    : value <= 300
    ? { label:"🟡 Emissioni moderate",                   bg: dk ? "bg-amber-950 border-amber-900"    : "bg-amber-50 border-amber-200",     txt:"text-amber-600 dark:text-amber-400" }
    : { label:"🔴 Alta intensità carbonica",             bg: dk ? "bg-red-950 border-red-900"         : "bg-red-50 border-red-200",         txt:"text-red-600 dark:text-red-400" };

  return (
    <div className={`flex items-center justify-between gap-3 px-5 py-3 rounded-xl border
      ${config.bg}`}>
      <p className={`text-sm font-semibold ${config.txt}`}>
        {config.label}
      </p>
      <p className={`text-base font-black shrink-0 ${config.txt}`}>
        {value} g/kWh
      </p>
    </div>
  );
}
