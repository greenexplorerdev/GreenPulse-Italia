import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-linear-to-b from-green-50 to-green-100 dark:bg-linear-to-b dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4 dark:text-green-200">
            GreenPulse Italia 🌱
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Sviluppatore Front-End con passione per l'energia rinnovabile e la
            sostenibilità
          </p>
        </div>

        {/* Descrizione */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-green-700 mb-6 dark:text-green-200">
            Chi sono
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Sono uno sviluppatore con esperienza in React, Node.js e tecnologie
            web moderne. Credo che la tecnologia possa essere un motore per un
            futuro più verde. Grazie a progetti come GreenPulse Italia, unisco
            competenze di programmazione e passione per l'ambiente per creare
            strumenti utili alla consapevolezza energetica.
          </p>
        </div>

        {/* Obiettivi */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-green-50 rounded-lg p-6 dark:bg-gray-800 dark:bg-opacity-50">
            <h3 className="text-2xl font-semibold text-green-600 mb-3 dark:text-green-300">
              Missione
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Fornire strumenti accessibili e intuitivi per monitorare e ridurre
              l'impronta carbonica, promuovendo l'adozione di energie
              rinnovabili nelle comunità locali.
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 dark:bg-gray-800 dark:bg-opacity-50">
            <h3 className="text-2xl font-semibold text-green-600 mb-3 dark:text-green-300">
              Visione
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Diventare un punto di riferimento italiano per l'educazione
              energetica, ispirando cittadini, scuole e imprese a scegliere
              soluzioni sostenibili.
            </p>
          </div>
        </div>

        {/*Stack Tecnologico */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-green-700 mb-6 dark:text-green-200">
            Stack Tecnologico
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Item */}
            <div className="bg-white rounded-lg p-4 shadow-sm dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center gap-3">
              <div className="w-8 h-8 shrink-0 bg-green-100 rounded-full dark:bg-green-900/20 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 text-xl">
                  ⚛️
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-100">
                  React 18
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Libreria UI dichiarativa
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center gap-3">
              <div className="w-8 h-8 shrink-0 bg-green-100 rounded-full dark:bg-green-900/20 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 text-xl">
                  🚀
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-100">
                  Vite
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Build tool veloce
                </p>
              </div>
            </div>
            {/* Item */}
            <div className="bg-white rounded-lg p-4 shadow-sm dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center gap-3">
              <div className="w-8 h-8 shrink-0 bg-green-100 rounded-full dark:bg-green-900/20 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 text-xl">
                  🎨
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-100">
                  Tailwind CSS
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Utility-first CSS
                </p>
              </div>
            </div>
            {/* Item */}
            <div className="bg-white rounded-lg p-4 shadow-sm dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center gap-3">
              <div className="w-8 h-8 shrink-0 bg-green-100 rounded-full dark:bg-green-900/20 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 text-xl">
                  🔀
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-100">
                  React Router v6
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Routing declarativo
                </p>
              </div>
            </div>
            {/* Item */}
            <div className="bg-white rounded-lg p-4 shadow-sm dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center gap-3">
              <div className="w-8 h-8 shrink-0 bg-green-100 rounded-full dark:bg-green-900/20 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 text-xl">
                  📊
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-100">
                  Recharts
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Grafici compositi
                </p>
              </div>
            </div>
            {/* Item */}
            <div className="bg-white rounded-lg p-4 shadow-sm dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center gap-3">
              <div className="w-8 h-8 shrink-0 bg-green-100 rounded-full dark:bg-green-900/20 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 text-xl">
                  📡
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-100">
                  Open-Meteo API
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Dati meteo gratuiti
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-green-700 mb-6 dark:text-green-200">
            Progetti in evidenza
          </h2>
          <div className="space-y-6">
            {/* Progetti */}
            <div className="bg-white rounded-lg p-6 shadow-md dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
              <h3 className="text-xl font-semibold text-green-600 mb-2 dark:text-green-300">
                GreenPulse Italia
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Applicazione full-stack per monitorare la produzione e il
                consumo di energia rinnovabile nelle città italiane, con grafici
                in tempo reale e suggerimenti per l'efficienza.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900/20 dark:text-green-200">
                  React
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900/20 dark:text-green-200">
                  Tailwind
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900/20 dark:text-green-200">
                  Recharts
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
              <h3 className="text-xl font-semibold text-green-600 mb-2 dark:text-green-300">
                ⚡ Green Energy Dashboard
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Dashboard energetica per monitorare dati statici di impianti
                energetici fittizzi e dati meteo reali di 3 città italiane.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900/20 dark:text-green-200">
                  JavaScript
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900/20 dark:text-green-200">
                  Open-Meteo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contatti */}
        <div className="text-center mb-12 gap-4 flex items-center justify-center">
          <a
            href="https://github.com/greenexplorerdev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors gap-2"
          >
            <span className="text-xl">🐙</span> Vedi il mio GitHub
          </a>
          <Link
            to={"/dashboard"}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors gap-2"
          >
            <span className="text-xl">🌍</span> Dashboard
          </Link>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-8 dark:border-gray-600">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 GreenPulse Italia • Realizzato con ♥ per un futuro
            sostenibile
          </p>
        </div>
      </div>
    </section>
  );
}
