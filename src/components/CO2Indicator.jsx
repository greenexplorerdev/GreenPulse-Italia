export default function CO2Indicator({ value }) {
  return (
    <div className="flex items-center mx-auto justify-center rounded-2xl h-fit w-fit p-8">
     
      {value <= 100 ? (
        <p className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
          Gli impianti generano: 🟢 Energia pulita /Emissioni minime
        </p>
      ) :  value <= 300 ? (
        <p className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
          Gli impianti generano: 🟡 Emissioni moderate
        </p>
      ) : (
        <p className="bg-red-100 text-red-800 px-4 py-2 rounded-full">
          Gli impianti generano: 🔴 Alta intensità carbonica
        </p>
      )}
    </div>
  );
}
