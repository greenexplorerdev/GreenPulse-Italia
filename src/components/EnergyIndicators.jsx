function EnergyIndicators({ value }) {
  if (value < 100) {
    return (
      <p className="bg-green-400 text-sky-600 mt-10 text-center">
        Indicator-Low
      </p>
    );
  } else if (value > 400) {
    return (
      <p className="bg-yellow-400 text-indigo-400  mt-10 text-center">
        Indicator-High
      </p>
    );
  } else {
    return (
      <p className="bg-red-500 text-amber-200  mt-10 text-center">
        Indicator-Medium
      </p>
    );
  }
}

export default EnergyIndicators;
