function EnergyIndicator({ value }) {
  return (
    <div className="flex  items-center mx-auto justify-center  rounded-2xl h-fit w-fit p-8">
      {value < 100 ? (
        <p className="bg-green-600 text-yellow-600  text-center rounded-full p-2">
          Indicator-Low
        </p>
      ) : value > 400 ? (
        <p className="bg-red-600 text-amber-400   text-center rounded-full p-2">
          Indicator-High
        </p>
      ) : (
        <p className="bg-amber-500 text-indigo-700  text-center rounded-full p-2 ">
          Indicator-Medium
        </p>
      )}
    </div>
  );
}

export default EnergyIndicator;
