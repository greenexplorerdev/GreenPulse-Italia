import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <section className="text-center px-4 py-8 md:py-16 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1
          className="text-3xl md:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-4"
          aria-label="GreenPulse Italia - Dashboard per l'energia verde"
        >
          GreenPulse Italia 🌱
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Monitora in tempo reale il mix energetico italiano: produzione rinnovabile,
          consumo fossile e impatto ambientale. Scopri quando l'energia è più verde
          e da quali fonti proviene.
        </p>
      </div>

      <div className="space-y-6 md:space-y-0 md:flex md:justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:w-1/2">
          <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
            Perché usare GreenPulse?
          </h2>
          <ul className="text-left space-y-3 text-gray-700 dark:text-gray-200">
            <li className="flex items-start">
              <span className="flex-shrink-0 text-emerald-500 mt-0.5">🌱</span>
              <span className="ml-3">Dati in tempo reale da fonti ufficiali</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 text-emerald-500 mt-0.5">📍</span>
              <span className="ml-3">Copertura nazionale: 20 città italiane</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 text-emerald-500 mt-0.5">⚡</span>
              <span className="ml-3">Analisi dettagliata per regione e fonte</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 text-emerald-500 mt-0.5">📊</span>
              <span className="ml-3">Visualizzazioni intuitive e accessibili</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:w-1/2">
          <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
            Come iniziare
          </h2>
          <ol className="text-left space-y-3 text-gray-700 dark:text-gray-200">
            <li className="flex items-start">
              <span className="flex-shrink-0 text-emerald-500 mt-0.5">1️⃣</span>
              <span className="ml-3">Vai alla Dashboard per vedere il mix energetico nazionale</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 text-emerald-500 mt-0.5">2️⃣</span>
              <span className="ml-3">Seleziona la tua regione per dati localizzati</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 text-emerald-500 mt-0.5">3️⃣</span>
              <span className="ml-3">Cerca la tua città per dettagli sull'irraggiamento solare</span>
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 transition-colors transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
        >
          Entra nella Dashboard →
        </button>
      </div>
    </section>
  );
}