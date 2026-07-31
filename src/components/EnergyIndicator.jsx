function EnergyIndicator({ value }) {
  return (
    <div className="flex mx-auto items-center justify-center ">
    <div className=" flex items-center mx-auto gap-3 px-4 py-2 rounded-lg shadow-lg transition-colors duration-200">
      {value < 100 ? (
        <p className="bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100  text-center rounded-full p-2">
          Indicator-Low
        </p>
      ) : value > 400 ? (
        <p className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100   text-center rounded-full p-2">
          Indicator-High
        </p>
      ) : (
        <p className="bg-yellow-500 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100  text-center rounded-full p-2 ">
          Indicator-Medium
        </p>
      )}
      <p className="text-sm font-medium">Irraggiamento: {value}  W/m²</p>
    </div>
    </div>
  );
}

export default EnergyIndicator;
