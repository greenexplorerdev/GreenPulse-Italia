function EnergyIndicator({ value }) {
  return (
    <div className="flex mx-auto items-center">
      <h3 className="p-4 text-center font-bold text-green-600">Irraggiamento: {value}  W/m²</h3>
    <div className="  items-center mx-auto justify-center  rounded-xl h-fit w-fit p-4">
      {value < 100 ? (
        <p className="bg-red-600 text-yellow-600  text-center rounded-full p-2">
          Indicator-Low
        </p>
      ) : value > 400 ? (
        <p className="bg-green-600 text-amber-400   text-center rounded-full p-2">
          Indicator-High
        </p>
      ) : (
        <p className="bg-lime-600 text-cyan-100  text-center rounded-full p-2 ">
          Indicator-Medium
        </p>
      )}
    </div>
    </div>
  );
}

export default EnergyIndicator;
