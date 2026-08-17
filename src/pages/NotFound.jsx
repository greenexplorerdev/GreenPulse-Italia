import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 flex-shrink-0">
          <svg className="h-full w-full text-emerald-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-6">
          Pagina non trovata
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 mt-4">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:ring-4 focus-ring-emerald-300 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors"
        >
          Torna alla Home
          <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}