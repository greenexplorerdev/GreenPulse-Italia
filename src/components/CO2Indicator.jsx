export default function CO2Indicator({ value }) {
  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl h-fit w-fit p-8">
        {value <= 100 ? (
          <p
            className="
                bg-green-50 text-green-800 px-4 py-2 rounded-full
                dark:bg-green-900 dark:text-green-100
                transition-colors duration-200
              "
          >
            Gli impianti generano: 🟢 Energia pulita / Emissioni minime
          </p>
        ) : value <= 300 ? (
          <p
            className="
                bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full
                dark:bg-yellow-900/20 dark:text-yellow-100
                transition-colors duration-200
              "
          >
            Gli impianti generano: 🟡 Emissioni moderate
          </p>
        ) : (
          <p
            className="
                bg-red-50 text-red-800 px-4 py-2 rounded-full
                dark:bg-red-900/20 dark:text-red-100
                transition-colors duration-200
              "
          >
            Gli impianti generano: 🔴 Alta intensità carbonica
          </p>
        )}
      </div>
    </div>
  );
}
