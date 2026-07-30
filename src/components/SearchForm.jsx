import { useForm } from "react-hook-form";
import { useDashboard, ACTION } from "../context/DashboardContext";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const { dispatch } = useDashboard();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(); // ← qui ottieni l’oggetto con le utilities di RHF

  function onSubmit(data) {
    // `data` contiene tutti i campi registrati: { city, sourceType, date }
    dispatch({ type: ACTION.SET_FILTER, payload: data.sourceType });
    navigate("/dashboard");
  }

  function handleReset() {
    reset(); // pulisce i valori del form (RHF)
    dispatch({ type: ACTION.RESET });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="city" className="text-sm font-medium text-gray-700">
          Città
        </label>

        <input
          className=" border
          border-gray-300
          rounded-md
          px-3
          py-2
          focus:outline-none
          focus:ring-2
          focus:ring-emerald-500
          w-full"
          type="text"
          id="city"
          {...register("city", {
            required: "La città è obbligatoria",
            minLength: { value: 2, message: "Minimo 2 caratteri" },
          })}
        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label
          htmlFor="sourceType"
          className="text-sm font-medium text-gray-700"
        >
          Tipo di fonte
        </label>

        <select
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
          id="sourceType"
          {...register("sourceType", {
            required: "Seleziona un tipo di fonte",
          })}
        >
          <option value="all">Tutte</option>
          <option value="renewable">Rinnovabili</option>
          <option value="fossil">Fossili</option>
        </select>
        {errors.sourceType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.sourceType.message}
          </p>
        )}
      </div>
      {/* Data */}
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="date" className="text-sm font-medium text-gray-700">
          Data
        </label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
          type="date"
          {...register("date", {
            required: "La data è obbligatoria",
            validate: (value) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return (
                new Date(value) <= today || "La data non può essere nel futuro"
              );
            },
          })}
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>
      <button
        type="button"
        className="rounded-2xl p-3 text-center font-medium mx-2"
        onClick={handleReset}
      >
        Reset
      </button>
      <button
        type="submit"
        className="rounded-2xl p-3 text-center font-medium mx-2 cursor-pointer"
      >
        Cerca..
      </button>
    </form>
  );
}
