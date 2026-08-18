import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 dark:bg-gray-900 py-12">
      
      <div className="mb-8 text-6xl">
        🌿
      </div>

      <h1 className="text-4xl font-bold text-green-800 mb-4 dark:text-green-200">
        Pagina non trovata
      </h1>
      <p className="text-lg text-gray-600 mb-6 dark:text-gray-300">
        Oops! La pagina che stai cercando non esiste o è stata spostata.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
        >
          <span className="mr-2">🏠</span> Torna alla Home
        </Link>

        <Link
          to="/about"
          className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-100"
        >
          <span className="mr-2">ℹ️</span> About
        </Link>
      </div>

      {/* suggerimento: user experience */}
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Suggerimento: controlla l'URL o usa il menu di navigazione sopra.
      </p>
    </div>
  );
}