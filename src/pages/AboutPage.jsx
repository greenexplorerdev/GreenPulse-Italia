import { useNavigate } from "react-router-dom";

export default function AboutPage() {
   const navigate = useNavigate()
    return (
      <section className="max-w-4xl mx-auto px-4 py-12 bg-sky-300 dark:bg-emerald-800">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-green-800 mb-2 dark:text-green-200">
            GreenPulse Italia 🌱
          </h1>
          <p className="text-lg text-gray-600">2026</p>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4  dark:text-green-200">
            Lista Stack
          </h2>
          <ol className="list-decimal pl-8 space-y-2 text-gray-800  dark:text-green-200">
            <li>React 18</li>
            <li>Vite</li>
            <li>Tailwind CSS</li>
            <li>React Router v6</li>
            <li>Recharts</li>
            <li>React Hook Form</li>
            <li>Open-Meteo API</li>
          </ol>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h2 className="text-2xl font-semibold text-green-700 mb-3">
            Scopo del Progetto
          </h2>
          <p className="text-gray-700 leading-relaxed">
            lo scopo del progetto è consolidare gli argomenti appresi nel corso
            React ed applicarli alla passione per la ecosostenibilità, le energie
            rinnovabili dando spunto per creare qualcosa di utile e benefico
          </p>
          <div className="mt-4 flex gap-3 mx-auto justify-between">
            <a
              href="https://github.com/greenexplorerdev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors"
            >
              GitHub
            </a>
           <button
        onClick={() => navigate("/dashboard")}
        className=" cursor-pointer inline-block px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
      >
         Dashboard
      </button>
          </div>
        </div>
      </section>
    );
  }
