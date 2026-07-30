import SearchForm from "../components/SearchForm";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <h1
        className="text-center font-extrabold text-3xl text-emerald-600 dark:text-emerald-50 mb-6"
        aria-label="GreenPulse Italia 🌱 "
      >
        GreenPulse Italia 🌱
      </h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300">
        Monitora il consumo e la produzione di energia verde nella città.
      </p>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300">
        Confronta fonti rinnovabili e fossili in tempo reale.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className=" cursor-pointer inline-block mt-6 px-6 py-3 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
      >
        Vai alla Dashboard
      </button>
      <hr className="my-6" />{" "}
      {/* my-6 aggiunge spazio verticale sopra e sotto la linea */}
      <SearchForm />
    </>
  );
}
