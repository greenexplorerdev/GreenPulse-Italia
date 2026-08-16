import SearchForm from "../components/SearchForm";
import { useNavigate } from "react-router-dom";
import WelcomeModal from "../components/WelcomeModal";
export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <WelcomeModal />
      <section className="text-center px-4 py-8 md:py-16 max-w-lg mx-auto">
        <h1
          className="text-2xl md:text-4xl font-extrabold text-emerald-600 text-center  dark:text-emerald-50 mb-6"
          aria-label="GreenPulse Italia 🌱 "
        >
          GreenPulse Italia 🌱
        </h1>
        <p className="text-base md:text-lg text-gray-600 mt-3">
          Monitora il consumo e la produzione di energia verde nella città.
        </p>
        <p className="text-base md:text-lg text-gray-600 mt-3">
          Confronta fonti rinnovabili e fossili in tempo reale.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className=" mt-6 w-full sm:w-auto px-6 py-3 cursor-pointer inline-block bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
          >
            Vai alla Dashboard
          </button>
        </div>
        <hr className="my-6" />{" "}
        {/*hr  my-6 aggiunge spazio verticale sopra e sotto la linea */}
        <SearchForm />
      </section>
    </>
  );
}
